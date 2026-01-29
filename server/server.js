import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import adminRouter from './routes/adminRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoutes.js'
import userRouter from './routes/userRoutes.js'

//start express
const app = express()
//connect to database
await connectDB()
await connectCloudinary()

//middleware, using cors to connect backend with any other domain
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res)=> res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/admin', express.json(), adminRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)

//port
const PORT = process.env.PORT || 5000

//run app on specified port number

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})