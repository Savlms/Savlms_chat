import express from 'express';
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookie from 'cookie-parser'
import database from './config/db.config'
import userRouter from './routes/user.route'

const port = process.env.PORT


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookie())
app.use(userRouter)
app.get('/', (req, res) => {
    res.send('Yooo, Wadup, Welome to Savlms chatroom')
})

app.listen(port, () => {
    database()
    console.log(`server started on ${port}`)
})