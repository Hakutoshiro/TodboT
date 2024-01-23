const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoModel = require('./models/Todo.js');
const CompletedDB = require('./models/Completed.js');
const app = express();

mongoose.connect("mongodb+srv://mahitnaykaynayugachach:IMPK266GzmYLzfBs@todo.vtinwxs.mongodb.net/?retryWrites=true&w=majority")
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
})) 

app.get('/test', (req, res) => {
    res.json("hello")
})

app.post('/addTask', async (req, res) => {
    const {Task} = req.body
    try {
        const taskDoc  =await todoModel.create({
            tasks:Task
        })
        res.json(taskDoc)
    } catch (error) {
    }
})

app.post('/completedTask' ,async (req, res) => {
    const {CompletedTask} =req.body
    try {
        await todoModel.deleteOne({tasks:CompletedTask})
        await CompletedDB.create({tasks:CompletedTask})
        res.json(CompletedTask)
    } catch (error) {
    }
})

app.post('/incompleteTask' ,async (req, res) => {
    const {IncompleteTask} =req.body
    try {
        await CompletedDB.deleteOne({tasks:IncompleteTask})
        await todoModel.create({tasks:IncompleteTask})
        res.json(IncompleteTask)
    } catch (error) {
    }
})

app.post('/deleteCTask' , async (req, res) => {
    const {t} =req.body
    try {
        await CompletedDB.deleteOne({tasks:t})
        res.json(t)
    }
    catch (error) {}
})

app.post('/deleteTask' , async (req, res) => {
    const {t} =req.body
    try {
        await todoModel.deleteOne({tasks:t})
        res.json(t)
    }
    catch (error) {}
})

app.get('/dataretreival', async (req, res)=>{
    try {
        const r1= await todoModel.find();
        const r2= await CompletedDB.find();
        res.json({r1,r2});
    } catch (error) {
    }
})

app.listen(4000);