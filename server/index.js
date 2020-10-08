require('dotenv').config()
const controller = require('./controller')
const path = require('path')
const massive = require('massive')
const express = require('express')
const app = express()
const session = require('express-session')







const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
    })
)


app.post('/api/auth/register', controller.register)
app.post('/api/auth/login', controller.login)
app.get('/api/posts', controller.getPosts)
app.post('/api/posts/:id', controller.writePost)
app.delete('/api/posts/:id', controller.deletePost)
app.get('/api/post/:id', controller.getPostById)
app.put('/api/posts/:id', controller.editPost)
app.post('/api/email',controller.email)



app.use(express.static(__dirname + '/../build'))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})










massive ({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false},
}).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log("DB Connected")
    app.listen(SERVER_PORT, () =>
    console.log(`DB Connected on port ${SERVER_PORT}`)
    )
}).catch((err) => {
    alert(err.message)
})