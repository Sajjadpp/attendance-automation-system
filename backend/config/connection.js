const mongoose = require('mongoose')


const connect = () =>{

    try{
        mongoose.connect('mongodb://127.0.0.1:27017/automatedAttendence')
    }
    catch(error){
        console.log(error)
    }

}

module.exports = connect