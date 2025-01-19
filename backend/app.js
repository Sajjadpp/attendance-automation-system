const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan')
const connect = require('./config/connection')
const cookieParser = require('cookie-parser');


connect()

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));
    
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))


const studentRouter = require('./routers/student')
const adminRouter = require('./routers/admin')
const staffRouter = require('./routers/staff');


app.use('/api/admin', adminRouter);
app.use('/api/staff', staffRouter);
app.use('/api/student', studentRouter);

app.listen(4000, ()=>{
    console.log('connected to port 4000')
})


