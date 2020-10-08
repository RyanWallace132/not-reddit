const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

const {EMAIL, PASSWORD} = process.env



module.exports = {
  email: async (req, res) => {
    const { name, message, email, title, image } = req.body

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });


      const info = await transporter.sendMail({
        from: `'${name}' <${email}>`,
        to: EMAIL,
        subject: title, 
        text: message,
        html: `<div>${message}<div> 
              <img src="cid:unique@nodemailer.com"/>`,
        attachments: [
          { 
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
          },
          {
            cid: 'unique@nodemailer.com',
            path:image
          }
        ]
      }, (err, res) => {
        if (err) {
          console.log('err', err)
        } else {
          console.log('res', res)
          res.status(200).send(info)
        }
      })
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  },





    register: async (req, res) => {
        
        const db = req.app.get('db')
        const { email, password } = req.body
    
        const [user] = await db.check_user([email])
    
        if (user) {
          return res.status(409).send('user already exists')
        }
    
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
    
        const [newUser] = await db.register_user([email, hash])
    
        req.session.user = newUser
    
        res.status(200).send(req.session.user)
    },
    
    login: async (req, res) => {
        const db = req.app.get('db')
        
        const { email, password } = req.body
        
        const [existingUser] = await db.check_user([email])
        
        if (!existingUser) {
          return res.status(404).send('User not found')
        }
        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
        
        if (!isAuthenticated) {
          return res.status(403).send('Incorrect email or password')
        }
    
        delete existingUser.hash

        req.session.user = existingUser
        console.log(req.session.user)
        res.status(200).send(req.session.user)
      },

    
    getPosts: async (req, res) => {

      const db = req.app.get('db')

      const posts = await db.get_posts()

      const{id} = req.params

      const{search, user_posts} = req.query

      if (user_posts === "true" && search) {
        const lowerSearch = search.toLowerCase()
        const filteredPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(lowerSearch)
        )
        return res.status(200).send(filteredPosts)
          } else if (user_posts === "false" && !search) {
        const filteredPosts = posts.filter((post) => post.author_id != id)
        return res.status(200).send(filteredPosts)
          } else if (user_posts === "false" && search) {
        const lowerSearch = search.toLowerCase()
        const filteredPosts = posts.filter(
            (post) =>
                post.author_id != id && post.title.toLowerCase().includes(lowerSearch)
        )
        return res.status(200).send(filteredPosts);
          } else {
        return res.status(200).send(posts)
          }

    },

    writePost: async (req, res) => {
      console.log(req.body)
      const db = req.app.get('db')

      const {id} = req.params
      console.log(req.params)
      const {title, image, content} = req.body
      await db.write_post([id, title, image, content])

      const posts = await db.get_posts()

      res.status(200).send(posts)


    },

    deletePost: async (req, res) => {

      const db = req.app.get('db')

      const {id} = req.params

      await db.delete_post([id])

      const posts = await db.get_posts()

      res.status(200).send(posts)
    },

    editPost: async (req, res) => {
      const db = req.app.get('db')
      const {id} = req.params
      const{content} = req.body
      console.log(id, content)
      
      const posts = await db.edit_post([content, id])
      
      res.status(200).send(posts)
    },

    getPostById: async (req, res) => {

      const db = req.app.get('db')

      const {id} = req.params

      const post = await db.get_post_by_id([id])

      res.status(200).send(post)

    }


}