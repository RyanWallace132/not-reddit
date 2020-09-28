require('dotenv').config()
const controller = require('./controller')
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