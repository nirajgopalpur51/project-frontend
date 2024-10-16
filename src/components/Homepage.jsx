import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPropertyForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    type: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // To navigate between pages

  const handlePropertyClick = () => {
    navigate('/property-listing'); 
  };

  const handleRecommedClick = () => {
    navigate('/recommendations'); 
  };

  const handleLogout = () => {
  
    localStorage.removeItem('authToken'); 
    
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/properties', formData);
      setMessage(response.data.message);
      setFormData({ name: '', location: '', price: '', type: '', description: '' }); // Reset form after success
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating property');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">

        {/* Buttons to navigate to other pages */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            type="button"
            onClick={handlePropertyClick}
            className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition duration-200"
          >
            Properties
          </button>

          <button
            type="button"
            onClick={handleRecommedClick}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-200"
          >
            Recommendations
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Form to add property */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Property</h1>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type (Rent/Sale):</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyForm;
