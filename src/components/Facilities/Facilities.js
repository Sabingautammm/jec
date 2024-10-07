import React, { useEffect, useState } from 'react';
import facilities from '../images/facilities.jpg';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios'; 

// Function to check admin status
const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("https://jec.edu.np/api/user/", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          if (response.data.is_staff) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the user data", error);
        });
    }
  }, []);

  return isAdmin;
};

export default function Facilities() {
  const isAdmin = useAdminStatus(); // Get admin status
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newFacility, setNewFacility] = useState({
    title: '',
    description: '',
    photo: ''
  });
  const [editFacility, setEditFacility] = useState(null);

  useEffect(() => {
    const fetchFacilitiesData = async () => {
      try {
        const response = await fetch('https://jec.edu.np/api/facilities'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setFacilitiesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilitiesData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setNewFacility(prevState => ({
        ...prevState,
        photo: files[0] // Store the file object
      }));
    } else {
      setNewFacility(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('title', newFacility.title);
      formData.append('description', newFacility.description);
      formData.append('photo', newFacility.photo);

      const response = await fetch('https://jec.edu.np/api/facilities/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add facility');
      }

      const addedFacility = await response.json();
      setFacilitiesData([...facilitiesData, addedFacility]);
      resetForm(); // Reset form after adding
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (facility) => {
    setEditFacility(facility);
    setNewFacility({
      title: facility.title,
      description: facility.description,
      photo: '' // Reset image field as it won't be editable directly
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('title', newFacility.title);
      formData.append('description', newFacility.description);
      if (newFacility.photo) {
        formData.append('photo', newFacility.photo); // Include photo only if changed
      }

      const response = await fetch(`https://jec.edu.np/api/facilities/${editFacility.id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update facility');
      }

      const updatedFacility = await response.json();
      setFacilitiesData(facilitiesData.map(fac => (fac.id === updatedFacility.id ? updatedFacility : fac)));
      resetForm(); // Reset form after updating
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://jec.edu.np/api/facilities/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete facility');
      }

      setFacilitiesData(facilitiesData.filter(facility => facility.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setNewFacility({ title: '', description: '', photo: '' });
    setEditFacility(null); // Reset edit facility
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='sm:mx-[20px] md:mx-[120px]'>
        <div>
          <h1 className='text-[38px] my-5 text-red-500 sm:text-center md:text-start' style={{ fontFamily: "'Merriweather', serif" }}>
            Know the facilities<br /> provided by JEC.
          </h1>
        </div>

        {/* Add New Facility Form */}
        {isAdmin && (
          <form onSubmit={handleSubmit} className='mb-5'>
            <h2 className='text-[30px] text-blue-500' style={{ fontFamily: "'Merriweather', serif" }}>Add New Facility</h2>
            <input
              type='text'
              name='title'
              placeholder='Facility Title'
              value={newFacility.title}
              onChange={handleInputChange}
              required
              className='p-2 mr-2 border border-gray-300'
            />
            <input
              type='text'
              name='description'
              placeholder='Facility Description'
              value={newFacility.description}
              onChange={handleInputChange}
              required
              className='p-2 mr-2 border border-gray-300'
            />
            <input
              type='file'
              name='photo'
              onChange={handleInputChange}
              className='p-2 mr-2 border border-gray-300'
            />
            <button type='submit' className='px-4 py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-red-500'>
              Add Facility
            </button>
          </form>
        )}
      
        {/* Edit Facility Form */}
        {isAdmin && editFacility && (
          <form onSubmit={handleUpdate} className='mb-5'>
            <h2 className='text-[30px] text-blue-500' style={{ fontFamily: "'Merriweather', serif" }}>Edit Facility</h2>
            <input
              type='text'
              name='title'
              placeholder='Facility Title'
              value={newFacility.title}
              onChange={handleInputChange}
              required
              className='p-2 mr-2 border border-gray-300'
            />
            <input
              type='text'
              name='description'
              placeholder='Facility Description'
              value={newFacility.description}
              onChange={handleInputChange}
              required
              className='p-2 mr-2 border border-gray-300'
            />
            <input
              type='file'
              name='photo'
              onChange={handleInputChange}
              className='p-2 mr-2 border border-gray-300'
            />
            <button type='submit' className='px-4 py-2 text-white transition duration-300 bg-green-500 rounded hover:bg-red-500'>
              Update Facility
            </button>
            <button
              type='button'
              onClick={resetForm} // Cancel editing
              className='px-4 py-2 text-white transition duration-300 bg-gray-500 rounded hover:bg-gray-700'
            >
              Cancel
            </button>
          </form>
        )}
      
        <div className='container-fluid'>
          <div className="row">
            <div className="col-md-6">
              <p className='font-[12px]'>
                Janakpur Engineering College (JEC) offers excellent facilities for an optimal learning environment. The college has a comprehensive library, modern laboratories, and advanced classrooms with projectors and smart boards. A fully equipped computer center provides high-speed internet and the latest software. Additionally, comfortable and secure hostel accommodations ensure a conducive living environment for students.
              </p>
            </div>
            <div className="flex items-center justify-end col-md-6">
              <img src={facilities} alt="facilities" className='rounded-lg shadow-md w-full sm:w-[400px]' />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {facilitiesData.map((facility) => (
            <div key={facility.id} className='p-4 my-8 transition-transform transform bg-white border border-gray-300 rounded-lg shadow-lg hover:scale-105'>
  <h3 className='text-xl font-bold text-center text-gray-800 transition-color hover:text-blue-600'>{facility.title}</h3>
  <img 
    src={facility.photo} 
    alt={facility.title} 
    className='w-full h-[150px] object-cover mb-2 rounded-lg shadow-md transition-opacity my-3 hover:opacity-90' 
  />
  <p className='mb-4 text-center text-gray-700'>{facility.description}</p>
  <div className='flex items-center justify-center'>
  <Link to='/learnMore'>
                      <button style={{ fontFamily: "'Merriweather', serif" }} className="mt-[20px] bg-blue-500 text-white py-[12px] px-[30px] rounded-[10px] text-[14px] hover:bg-red-500 hover:text-white transition duration-300">
                        Learn More
                      </button>
                    </Link>
    </div>
  {isAdmin && (
    <div className='flex justify-between mt-2'>
      <button 
        onClick={() => handleEdit(facility)} 
        className='flex items-center px-3 py-1 text-white transition-all duration-300 bg-blue-500 rounded-md shadow-md hover:bg-blue-600'
      >
        <span className='mr-1'>✏️</span> Edit
      </button>
      <button 
        onClick={() => handleDelete(facility.id)} 
        className='flex items-center px-3 py-1 text-white transition-all duration-300 bg-red-500 rounded-md shadow-md hover:bg-red-600'
      >
        <AiFillDelete className='mr-1' /> Delete
      </button>
    </div>
  )}
</div>

   
          ))}
        </div>
      </div>
    </>
  );
}
