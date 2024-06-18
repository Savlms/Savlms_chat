import express from 'mongoose'
//const app = express ()
import dotenv from 'dotenv'
import cors from 'cors'
import cookie from 'cookie-parser'
import database from './config/db.config'
dotenv.config()
const port = process.env.PORT
