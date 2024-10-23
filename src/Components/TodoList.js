import React, { useState } from "react";
import { formatDate } from "./../utils/utils";
import { DeleteIcon, EditIcon } from "./../common/svgIcons/Icons";
import Dialog from "./Dialog";

export default function TodoList({ todo, deleteTodo, editTodo, toggleComplete }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleEdit = (item) => {
    setCurrentTodo(item);
    setDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo({ ...currentTodo, [name]: value }); // update current todo
  };

  const handleSave = () => {
    editTodo(currentTodo._id, currentTodo);
    setDialogOpen(false);
  };
   
  const handleDelete=(id)=>{
    if( window && window.confirm('Are you want to delete!')){
      deleteTodo(id)
    }
  };


  return (
    <div className="flex justify-center  py-6">
      
      <table className="table-auto w-full max-w-4xl bg-white shadow-md border rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Completed</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Priority</th>
            <th className="py-3 px-6 text-left">Due Date</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">

          {
            todo?.map((item) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${item.completed && "bg-green-500 hover:bg-green-500"}`}
              >
                <td className="py-3 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => toggleComplete(item._id, !item.completed)}
                  />
                </td>
                <td className="py-3 px-6 text-left">{item.title}</td>
                <td className="py-3 px-6 text-left">{item.description}</td>
                <td className="py-3 px-6 text-left">{item.priority}</td>
                <td className="py-3 px-6 text-left">
                  {formatDate(item.dueDate)}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-600"
                      aria-label="Edit todo"
                    >
                      <EditIcon />
                    </button>
                    <button
                      // onClick={() => deleteTodo(item._id)}
                      onClick={()=>handleDelete(item._id)}
                      className="text-red-500 hover:text-red-600"
                      aria-label="Delete todo"
                    >
                      <DeleteIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            )) 
            
          }
        </tbody>
      </table>

      {/* Dialog box  */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        todo={currentTodo}
        onSave={handleSave}
        handleEditChange={handleEditChange}
      />
    </div>
  );
}
