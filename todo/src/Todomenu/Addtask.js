import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axios from 'axios';

export default function Addtask({ fetchTodos }) {

  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    try {

      const payload = {
        Task : newTask
      };
      const response = await axios.post('https://7fdk7ts1ih.execute-api.us-east-1.amazonaws.com/v1/todos', payload);
      fetchTodos();
      setNewTask("");  // Clear the input field after adding the task
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4 w-[600px] gap-10">

        <Input
          size="md"
          label="Task"
          placeholder="Project Gestalt Report"
          value={newTask}
          className="w-5/6"
          onChange={(e) => setNewTask(e.target.value)}
        />

        <div
          className="flex  items-center justify-center w-12  py-4  transition"
        >
          <Button color="primary" className='bg-softred' onClick={handleAddTask}>
            Add
          </Button>
        </div>


      </div>
    </div>
  )
}
