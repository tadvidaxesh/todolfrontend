import React, { useState, useEffect } from 'react';
import TodoList from "./TodoList";
import { formatDate } from "../utils/utils";
import { useNavigate } from 'react-router-dom';


export default function Todo() {
    const token = localStorage.getItem('token');
    const [todo, setTodo] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "",
        dueDate: formatDate(new Date().toDateString()),
    });
    const [errors, setErrors] = useState({});



    const navigate = useNavigate();
    const username = localStorage.getItem('email');
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };


    const fetchData = async () => {
        console.log("token", token);

        const response = await fetch("http://localhost:5000/api/todo", {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        console.log("response==>", response);
        if (response.ok) {
            const data = await response.json();
            setTodo(data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const setData = async () => {
        // const token = localStorage.getItem('token');
        // console.log("==[formDate sent]==>", formData);
        const response = await fetch("http://localhost:5000/api/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        if (response?.ok === true) {
            // alert("task is created");
            fetchData();
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const newErrors = {};

        // Title validation
        if (!formData.title) {
            newErrors.title = "Title is required";
        }

        // Description validation
        if (!formData.description) {
            newErrors.description = "Description is required";
        }

        // Priority validation
        if (!formData.priority || formData.priority < 0 || formData.priority > 5) {
            newErrors.priority = "Priority must be between 0 and 5";
        }

        // Due Date validation
        if (!formData.dueDate) {
            newErrors.dueDate = "Due date is required";
        }

        // Set errors or submit if no errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            // Submit the form (add todo logic)
            // console.log("Form submitted", formData);
        }
        setData();
        setFormData({
            ...formData,
            title: "",
            description: "",
            priority: "",
        });
    };

    const deleteTodo = async (id) => {
        // const token = localStorage.getItem('token');
        try {
            await fetch(`http://localhost:5000/api/todo/${id}`, {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });

            const newTodo = todo?.filter((todo) => todo?._id !== id);
            setTodo(newTodo);
        } catch (error) {
            console.error("Error while delete todo", error);
        }
    };

    const editTodo = async (id, updatedTodo) => {
        // const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTodo),
        });
        // console.log("==[updatedTodo]==>", response);
        const newTodo = todo?.filter((item) => item._id !== id);
        setTodo([...newTodo, updatedTodo]);
    };

    // Todo set to Completed
    const toggleComplete = async (id, isCompleted) => {
        // const token = localStorage.getItem('token');
        try {
            console.log(isCompleted);

            const updatedTodo = todo.find((item) => item._id === id);
            console.log(updatedTodo);

            updatedTodo.completed = isCompleted;

            const response = await fetch(`http://localhost:5000/api/todo/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedTodo),
            });

            if (response.ok) {
                const newTodo = todo?.filter((item) => item._id !== id);
                setTodo([...newTodo, updatedTodo]);
            }
        } catch (error) {
            console.error("Error updating todo completion", error);
        }
    };
    return (
        <>
            {/* Title */}
            <div className="flex justify-between items-center py-4 px-6 bg-gray-800">
                <h2 className="text-white text-xl max-w-fit">{username ? `${username}` : 'Welcome!'}</h2>
                <h1 className="text-3xl font-bold px-4 py-2 text-white">
                    Todo List
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                >
                    Logout
                </button>
            </div>
            {/* Form */}
            <form
                className="max-w-4xl mt-3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border shadow-md rounded-lg p-8"
                onSubmit={handleSubmit}
                type="POST"
            >
                {/* Title Input */}
                <div>
                    <input
                        className={`w-full px-4 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        type="text"
                        value={formData.title}
                        id="title"
                        placeholder="Enter Title"
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>

                {/* Description Input */}
                <div>
                    <input
                        className={`w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        type="text"
                        value={formData.description}
                        id="description"
                        placeholder="Enter Description..."
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                </div>

                {/* Priority Input */}
                <div>
                    <input
                        className={`w-full px-4 py-2 border ${errors.priority ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        type="number"
                        min={"0"}
                        max={"5"}
                        value={formData.priority}
                        id="priority"
                        placeholder="Priority (0-5)"
                        onChange={(e) =>
                            setFormData({ ...formData, priority: e.target.value })
                        }
                    />
                    {errors.priority && (
                        <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
                    )}
                </div>

                {/* Due Date Input */}
                <div>
                    <input
                        className={`w-full px-4 py-2 border ${errors.dueDate ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        type="date"
                        value={formData.dueDate}
                        id="date"
                        onChange={(e) => {
                            console.log("==[]==>", e.target.value);
                            setFormData({ ...formData, dueDate: e.target.value });
                        }}
                    />
                    {errors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="col-span-2">
                    <button
                        type="submit"
                        className="w-full px-4 py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Add Todo
                    </button>
                </div>
            </form>
            <TodoList todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} />
        </>
    )
}
