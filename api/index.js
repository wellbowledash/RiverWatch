import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import regionRoutes from './routes/regions.route.js'
import waterbodyRoutes from './routes/waterbodies.route.js'
import sensorRoutes from './routes/sensors.route.js'
import path from 'path'
dotenv.config()
const app = express()
app.use(express.json())
mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log('MongoDB is connected');
    }
)
.catch((err)=>{
    console.log(err);
})
const __dirname = path.resolve()
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
app.use('/api/regions',regionRoutes)
app.use('/api/waterbodies',waterbodyRoutes)
app.use('/api/sensors',sensorRoutes)
app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success : false,
        statusCode,
        message,
        

})
}
)