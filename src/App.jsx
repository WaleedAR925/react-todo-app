import React, { useState } from 'react'
import { ListChecks } from 'lucide-react';
import { Trash } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Check } from 'lucide-react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("")
  const [editIndex, setEditIndex] = useState(null)
  const [editText, setEditText] = useState("")
  const addTask=(e)=>{
    e.preventDefault();
    setTasks([...tasks,{id:Date.now(),title:newTask,completed:false}])
    setNewTask("")
  }
  const deleteTask=(id)=>{
    const deletedContent = tasks.filter((task)=>task.id !==id)
    setTasks(deletedContent);
  }
 const editTask = (id) => {
  const task = tasks.find((task) => task.id === id);
  setEditIndex(id);
  setEditText(task.title);
}
const saveTask=(e)=>{
  e.preventDefault();
  const updatedTasks = tasks.map((task) => {
    return task.id === editIndex
      ? { ...task, title: editText }
      : task;
  });

  setTasks(updatedTasks);
  setEditText("");
}
const completeTask=(id)=>{
  const completed = tasks.map((task)=>task.id==id?{...task, completed:true}:task)
  setTasks(completed)
 
  
}
  return (

    <div className='min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-pink-100 flex justify-center items-center p-4'>
      <div className='w-[26rem] max-w-full h-[34rem] bg-gradient-to-b from-[#9d2449] to-[#6e1630] rounded-3xl shadow-[0_20px_60px_rgba(139,30,63,0.45)] p-6 flex flex-col text-white'>
       <div className='flex pb-5 gap-3 items-center border-b border-white/15'>
         <div className='bg-white/15 p-2 rounded-xl'>
          <ListChecks size={20} className=' text-white'/>
         </div>
        <h3 className='text-2xl font-bold tracking-tight'>To-Do List</h3>
       </div>

       <form action="" className='flex justify-between
        h-12 items-center bg-white/10 border border-white/20 rounded-full mt-5 pl-5 pr-1 focus-within:border-white/60 focus-within:bg-white/15 transition'
        onSubmit={(e)=>{
          addTask(e);
        }}>
        <input type="text" value={newTask}
        className='bg-transparent outline-none flex-1 text-sm placeholder-white/50 text-white'
        placeholder='Add a new task'
        onChange={(e)=>{
          setNewTask(e.target.value)
        }}/>
        <button className='bg-white text-[#8B1E3F] font-semibold text-sm h-10 px-6 rounded-full hover:bg-rose-100 active:scale-95 transition cursor-pointer'>Add</button>
       </form>
       {editIndex !== null && (
  <form
    action=""
    className='flex justify-between h-12 items-center bg-amber-300/10 border border-amber-200/40 rounded-full mt-3 pl-5 pr-1 focus-within:border-amber-200 transition'
    onSubmit={(e) => {
      saveTask(e);
    }}
  >
    <input
      type="text"
      value={editText}
      className='bg-transparent outline-none flex-1 text-sm placeholder-white/50 text-white'
      onChange={(e) => {
        setEditText(e.target.value)
      }}
    />

    <button className='bg-amber-200 text-[#6e1630] font-semibold text-sm h-10 px-6 rounded-full hover:bg-amber-100 active:scale-95 transition cursor-pointer'>Save</button>
  </form>
)}
       <div className='flex flex-col gap-3 flex-1 min-h-0 mt-5 overflow-y-auto pr-1'>
        
        {tasks.map((task)=>{
          return <div key={task.id} className='flex justify-between items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 p-4 rounded-2xl transition'>
            <p className={task.completed ? 'text-sm font-medium line-through text-white/50 break-words min-w-0' : 'text-sm font-medium break-words min-w-0'}>{task.title}</p>
            {task.completed?(
            <button disabled className='text-xs font-semibold bg-emerald-400/20 text-emerald-200 px-3 py-1 rounded-full shrink-0'>Completed</button> ):(<> 
             <div className='flex items-center gap-2 shrink-0'>
          <button className='bg-white/10 hover:bg-red-500/80 p-2 rounded-lg transition cursor-pointer'>< Trash size={18} className='text-white'
           onClick={()=>{
            deleteTask(task.id);
          }} /></button>
          <button className='bg-white/10 hover:bg-amber-400/80 p-2 rounded-lg transition cursor-pointer'><SquarePen size={18} className='text-white' 
          onClick={()=>{
            editTask(task.id);
          }}/></button>
          <button className='bg-white/10 hover:bg-emerald-500/80 p-2 rounded-lg transition cursor-pointer'
          onClick={()=>{
            completeTask(task.id)
          }}><Check size={18} className='text-white' /></button>
        </div></>)
            }
           
          </div>
        })}
        
       </div>
      </div>
    </div>
  )
}

export default App