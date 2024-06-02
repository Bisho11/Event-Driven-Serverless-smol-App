import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';

export default function Todo({ id, Task, Status, fetchTodos }) {
  const [editedTask, setEditedTask] = useState(Task);
  const [editedStatus, setEditedStatus] = useState(Status);
  const [isEditing, setIsEditing] = useState(false);

  const completeTask = async () => {
    try {
      await axios.patch(`https://7fdk7ts1ih.execute-api.us-east-1.amazonaws.com/v1/todos/${id}`, {
        Status: 'Completed'
      });
      fetchTodos();
    } catch (error) {
      console.error('There was an error updating the task!', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://7fdk7ts1ih.execute-api.us-east-1.amazonaws.com/v1/todos/${id}`, {
        Task: editedTask,
        Status: editedStatus
      });
      setIsEditing(false);
      fetchTodos();
    } catch (error) {
      console.error('There was an error updating the task!', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://7fdk7ts1ih.execute-api.us-east-1.amazonaws.com/v1/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('There was an error fetching deleting the task!', error);
    }
  };

  return (
    <div className="flex items-center justify-between w-[600px] bg-white shadow-md rounded-lg p-4 mb-4">
      {isEditing ? (
        <div className="flex items-center w-full gap-4">
          <Input
            size="md"
            placeholder="Task"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
            className="p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex gap-2">
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button color="error" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className={`font-bold text-2xl ${Status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
                {Task}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  Status === 'In Progress'
                    ? 'bg-staffy text-darkred'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {Status}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
            {Status !== 'Completed' && (
              <Button className="font-open bg-softred" radius="sm" onClick={completeTask} endContent={<CheckIcon style={{ color: '#2c2c2c' }} />}>
            </Button>
            )}
            <Button className="font-open bg-softred" radius="sm" onClick={() => setIsEditing(true)} endContent={<EditNoteIcon style={{ color: '#2c2c2c' }} />} >
            </Button>

            <Button className="font-open bg-softred" radius="sm" onClick={handleDelete} endContent={<DeleteIcon style={{ color: '#2c2c2c' }} />}>
            </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
