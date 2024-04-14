import { useState,useEffect } from "react";
import axios from "axios";



export default function Todo()
{
    document.title = "Todo";
    const [Tasks,addTask]=useState([])
    const [CompletedTasks,addCompletedTask]=useState([])
    const [Task,setTask]=useState('')
    useEffect(()=>{
        handleDataRetreival();
    },[])
    const handleDataRetreival = async() =>
    {
        const result=await axios.get('/dataretreival')
        result.data.r1.forEach((element)=>{addTask(t=>[...t,element.tasks])})
        result.data.r2.forEach((element)=>{addCompletedTask(t=>[...t,element.tasks])})
    }

    const   handleAddTask = async ()=>
    {
        if(Task!=="")
        {
            addTask(t=>([...t,Task]))
            try {
                await axios.post('/addTask',{Task})
            } catch (error) { 
            }
        }
        setTask("")
    }

    const handleCompletedTask = async(index) =>
    {
        const CompletedTask=Tasks.filter((_,i)=>i==index).toString();
        
        addCompletedTask(c=>[...c,CompletedTask])
        addTask(t=>t.filter((_,i)=>i!=index))
        try {
            await axios.post('/completedTask',{CompletedTask})
        } catch (error) { 
        }
    }

    const handleIncompleteTask =async(index) =>
    {
        const IncompleteTask = CompletedTasks.filter((_,i)=>i==index).toString()
        addTask(t=>[...t,IncompleteTask])
        addCompletedTask(c=>c.filter((_,i)=>i!=index))
        try {
            await axios.post('/incompleteTask',{IncompleteTask})
        } catch (error) { 
        }
    }

    const handleCDeleteTask = async (index)=>
    {
        const t=CompletedTasks.filter((_,i)=>i==index).toString();
        addCompletedTask(c=>c.filter((_,i)=>i!=index))
        try {
            await axios.post('/deleteCTask',{t})
        } catch (error) { 
        }
    }
    const handleDeleteTask = async (index)=>
    {
        const t=Tasks.filter((_,i)=>i==index).toString()
        addTask(c=>c.filter((_,i)=>i!=index))
        try {
            await axios.post('/deleteTask',{t})
        } catch (error) { 
        }
    }
    return (
        <div className="py-4 px-8 flex flex-col min-h-screen text-center max-w-5xl mx-auto">
                <h1 className=" font-serif font-bold text-5xl my-10">TO-DO-LIST</h1>
                <header className="bg-primary flex gap-3 h-12 w-5xl justify-center items-center border border-blue-800">
                        <input type="text"
                            placeholder="Enter New Task"
                            value={Task}
                            onChange={ev => { setTask(ev.target.value) }}
                            className="px-5 py-1 rounded-2xl w-96"
                        />
                        <button onClick={handleAddTask} className="flex-none bg-secondary text-white w-20  rounded-2xl pb-1">Add Task</button>
                </header>
                <div id="showTask" className="flex flex-col justify-center text-center w-full my-2 border   border-blue-800 min-h-20 bg-tertiary">
                        <h1 className="my-2">Tasks to Complete:</h1>
                        <ul className="mb-2">
                            {Tasks.map(
                                (task, index) =>
                                    <div className="flex justify-between items-center h-10 max-w-3xl mx-auto border border-dotted-2 bg-white rounded-full px-6">

                                        <li key={index} className="">{task}</li>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleCompletedTask(index)}
                                            className="bg-green-400 text-white rounded-full px-3 py-1"
                                            >Completed</button>
                                            <button onClick={() => handleDeleteTask(index)}
                                            className="bg-red-500 text-white rounded-full px-3 py-1"
                                            >Delete</button>
                                        </div>
                                    </div>
                            )}
                        </ul>
                </div>
                <div id="showCompletedTask" className="flex flex-col justify-center text-center w-full  border   border-blue-800 min-h-20 bg-tertiary">
                    <h1 className="my-2">Completed Task:</h1>
                        <ul className="mb-2">
                            {CompletedTasks.map(
                                (task, index) =>
                                    <div className="flex justify-between items-center h-10 max-w-3xl mx-auto border border-dotted-2 bg-white rounded-full px-6">
                                        <li key={index}>{task}</li>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleIncompleteTask(index)} className="bg-yellow-400 text-white rounded-full px-3 py-1">Incomplete</button>
                                            <button onClick={() => handleCDeleteTask(index)} className="bg-red-500 text-white rounded-full px-3 py-1">Delete</button>
                                        </div>
                                    </div>
                            )}
                        </ul>
                </div>
            </div>
        
    );
}