const express = require('express')
const logger = require('morgan')
const cors = require('cors')

//Routs


const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//app.use for the Routes


app.use('/', (req,res)=>{
  res.send('App is connected')
})

app.listen(PORT, () =>{
  console.log(`Running the Express server on Port ${PORT}...`)
})