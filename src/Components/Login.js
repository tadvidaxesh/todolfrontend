import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token",data.token); // Save user info
                localStorage.setItem("email",formData.email);
                navigate('/todos');
            }else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='min-h-screen bg-gray-200 py-6 flex flex-col justify-center items-center sm:py-12'>
            <section className='px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
                <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h2>
                {error &&
                    <p className='text-center text-red-500 mb-4'>
                        {error}
                    </p>}
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-6'>

                    {/* Email Input */}
                    <input
                        autoComplete='off'
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none'
                        required
                    />

                    {/* Password Input */}
                    <input
                        autoComplete='off'
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none'
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className='w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md'
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>

            </section>

        </div>
    );
}

export default Login;
