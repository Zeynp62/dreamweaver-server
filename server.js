const express = require('express')
const logger = require('morgan')
const cors = require('cors')

//Routs
const UserRouter = require('./routes/UserRouter')
const CategoryRouter = require('./routes/CategoryRouter')
const TaskRouter = require('./routes/TaskRouter')
const PostRouter = require('./routes/PostRouter')

//auth
const AuthRouter = require('./routes/AuthRouter')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use for the Routes
app.use('/auth', AuthRouter)

app.use('/user', UserRouter)
app.use('/category', CategoryRouter)
app.use('/posts', PostRouter)
app.use('/tasks', TaskRouter)

app.use('/uploads', express.static('./uploads'))

app.use('/', (req, res) => {
  res.send('App is connected')
})

app.listen(PORT, () => {
  console.log(`Running the Express server on Port ${PORT}...`)
})
