import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PropertyListingPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get('http://localhost:5000/api/getproperties');
      setProperties(response.data);
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Property Listings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">{property.name}</h2>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <p className="text-gray-900 font-semibold text-lg mb-4">${property.price}</p>
                <p className="text-gray-700">{property.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyListingPage;
