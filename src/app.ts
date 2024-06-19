import express from 'express';
const app = express()
import dotenv from 'dotenv'
import cors from 'cors'
import cookie from 'cookie-parser'
import database from './config/db.config'
import userRouter from './routes/user.route'
dotenv.config()
const port = process.env.PORT


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookie())
app.use(userRouter)
app.get('/', (req, res) => {
    res.send('Yooo, Whadup, Welome to Savlms chatroom')
})

app.listen(port, () => {
    database()
    console.log(`server started on ${port}`)
})