import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  const handlePropertyClick = () => {
    navigate('/property-listing'); 
  };

  const handleRecommedClick = () => {
    navigate('/recommendations'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const userData = isLogin
        ? { email, password }
        : { username, email, password };
      const response = await axios.post(`http://localhost:5000${endpoint}`, userData);
      
      // On successful login, navigate to the homepage
      if (isLogin && response.status === 200) {
        setMessage('Login successful!');
        navigate('/homepage'); // Navigate to Homepage on successful login
      } else {
        setMessage('User registered successfully! You can now log in.');
      }
      resetForm();
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-700 underline mb-6">{isLogin ? 'Login' : 'Signup'}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">Name:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required={!isLogin}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? 'No account? ' : 'Already have an account? '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {isLogin ? 'Signup' : 'Login'}
          </span>
        </p>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <br /><br />

        <div className="flex space-x-4">
    
        {/* <button
        type="button" // Change type to 'button' to avoid form submission
        onClick={handlePropertyClick}
        className="w-full px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition duration-200">
        Properties
      </button>


      <button
        type="button" // Change type to 'button' to avoid form submission
        onClick={handleRecommedClick}
        className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-yellow-600 transition duration-200">
        Recommendation
      </button> */}
  </div>

      </div>
    </div>
  );
};

export default AuthPage;
