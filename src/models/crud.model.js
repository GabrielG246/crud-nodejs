const mongoose= require('mongoose')

const userScheema= mongoose.Schema(
    {
        fName: String,
        lName: String,
        nName: String,
        pass: String
    }
)

module.exports= mongoose.model('User', userScheema)