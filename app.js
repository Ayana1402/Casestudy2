


// Task1: initiate app and run server at 3000
const express = require('express')
const morgan = require('morgan')
const app = new express()
app.use(morgan('dev'))
require('dotenv').config()
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(3000,()=>{
    console.log("app is listening in PORT 3000")

})

// Task2: create mongoDB connection 

const { default: mongoose } = require("mongoose");
const EmployeeSchema = mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})
const EmployeeData = mongoose.model('employedatas',EmployeeSchema)
mongoose.connect('mongodb+srv://ayanagangadharan1402:Ayana123@cluster0.egurskh.mongodb.net/EmployeeDB?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch(()=>{
    console.log(" Failed to connect")
})


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below



//TODO: get data from db  using api '/api/employeelist'
app.get ('/api/employeelist',async(req,res)=>{

    try{
    const data = await EmployeeData.find()
    res.status(200).json(data)
    }
    catch(error){

        res.status(404).json(error)
    }
   
})




//TODO: get single data from db  using api '/api/employeelist/:id'
app.get ('/api/employeelist/:id',async(req,res)=>{

    try{
    const data = await EmployeeData.find()
    const id = req.params.id
    const index = data.findIndex(data => data.id === id);
    res.status(200).json(data[index]);

   //res.status(200).json(data)
    }
    catch(error){

        res.status(404).json(error)
    }
   
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{

    try{
        var item = req.body
        const data = new EmployeeData(item)
        await data.save()

        res.json(data)

    }
    catch(error){
        res.status(404).json(error)
    }
})
  




//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{

    try{
        // const data = await EmployeeData.find()
        // const id = req.params.id
        // const index = data.findIndex(data => data.id === id);
        // data.splice(index, 1);
        // res.json(data);
        const id = req.params.id
        const data =await EmployeeData.deleteOne({_id: id}) 
        res.json(data)

    }
    catch(error){
        res.status(404).json(error)
    }
})





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put ('/api/employeelist',async(req,res)=>{

    try{
    
    var item = req.body
    const data =await EmployeeData.findOneAndUpdate({_id: item._id},item) 
    res.json(data)
    }
    catch(error){

        res.status(404).json(error)
    }
   
})





//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});






