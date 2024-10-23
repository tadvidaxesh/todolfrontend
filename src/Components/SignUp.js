import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Send data to your backend signup endpoint
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            // Check if the response is OK
            if (response.ok) {
                console.log("Signup successful");
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || "Signup failed, please try again");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className='min-h-screen bg-gray-200 py-6 flex flex-col justify-center items-center sm:py-12'>
            <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
                <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
                    Sign Up
                </h2>
                {error && (
                    <p className='text-center text-red-500 mb-4'>{error}</p>
                )}
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center gap-6'
                >
                    {/* Email Input */}
                    <input
                        autoComplete='off'
                        type='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />

                    {/* Password Input */}
                    <input
                        autoComplete='off'
                        type='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />

                    {/* Confirm Password Input */}
                    <input
                        autoComplete='off'
                        type='password'
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md'
                    >
                        Sign Up
                    </button>
                </form>

                <p className='text-center text-gray-500 mt-6'>
                    Already have an account?{" "}
                    <a href='/login' className='text-blue-500 hover:underline'>
                        Login
                    </a>
                </p>
            </div>

        </div>
    );
}
