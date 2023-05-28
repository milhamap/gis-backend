const express = require('express')
const morgan = require('morgan')

const app = express()

const userRouter = require('./src/routers/users')
const schoolPlaceRouter = require('./src/routers/school_places')
const majorRouter = require('./src/routers/majors')
const markerRouter = require('./src/routers/markers')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/school', schoolPlaceRouter)
app.use('/api/v1/major', majorRouter)
app.use('/api/v1/marker', markerRouter)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

module.exports = app