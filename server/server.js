import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

//start express
const app = express()
//connect to database
await connectDB()

//middleware, using cors to connect backend with any other domain
app.use(cors())

// Routes
app.get('/', (req, res)=> res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks)

//port
const PORT = process.env.PORT || 5000

//run app on specified port number

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})