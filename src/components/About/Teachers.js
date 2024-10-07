import React, { useState, useEffect } from 'react';
import axios from 'axios';
import teacherImagePlaceholder from '../images/jec-teachers.jpg';
import AddTeacher from './Teachers/AddTeachers';
import EditTeacher from './Teachers/EditTeachers';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios.get("https://jec.edu.np/api/user/", {
      headers: {
        "Authorization": `Token ${token}`,
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
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://jec.edu.np/api/teachers/');
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching the teachers data", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleToggleTeam = () => {
    setShowTeam(!showTeam);
  };

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
  };

  const handleUpdateTeacher = (updatedTeacher) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
      )
    );
    setEditingTeacher(null); // Reset editing teacher after update
  };

  const handleDeleteClick = async (teacherId) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`https://jec.edu.np/api/teachers/${teacherId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTeachers((prevTeachers) => prevTeachers.filter(teacher => teacher.id !== teacherId));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className='sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 mb-5 w-[90%] mx-auto'>
      {isAdmin && (
        <button 
          onClick={handleToggleTeam} 
          className="px-4 py-2 mt-6 mb-4 text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700"
        >
          {showTeam ? "Close" : "Edit"}
        </button>
      )}


      <section className='mt-8 mb-12'>
        <h1 className='text-3xl font-semibold text-center text-red-600'>
          JEC'S FACULTY
        </h1>
        <div className='mt-6 md:mt-10'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <p className='font-serif text-base leading-relaxed text-gray-800 md:text-lg lg:text-xl'>
              The teachers at Janakpur Engineering College are instrumental in shaping the future of engineering...
            </p>
            <img src={teacherImagePlaceholder} className='mt-6 md:mt-0 md:ml-6 h-[300px] w-full md:w-1/2 rounded-lg shadow-lg' alt="Teachers" />
          </div>
        </div>
      </section>

      {/* update teacher panel */}
      {editingTeacher && (
        <EditTeacher
          teacher={editingTeacher}
          onUpdate={handleUpdateTeacher}
          onClose={() => setEditingTeacher(null)}
        />
      )}

      {showTeam && <AddTeacher />} {/* Render the AddTeacher component if showTeam is true */}

      <section className='my-16'>
        <h1 className='text-3xl font-semibold text-center text-red-600'>
          Our Teachers
        </h1>
        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <div className='flex justify-center' key={teacher.id}>
                  <div className="w-64 bg-white rounded-lg shadow-lg card">
                    <img 
                      src={teacher.photo || "https://via.placeholder.com/150"} 
                      className="object-cover w-full h-48 rounded-t-lg" 
                      alt="Teacher" 
                    />
                    <div className="p-4">
                      <h5 className="text-xl font-semibold text-blue-900">
                        {teacher.name}
                      </h5>
                      <p className="text-sm font-medium text-gray-600">FACULTY: {teacher.faculty}</p>
                      <h1 className="text-sm font-medium">SUBJECT: {teacher.subject}</h1>
                      {isAdmin && (
                        <div className="flex justify-between mt-4">
                          <button onClick={() => handleEditClick(teacher)} className="flex items-center text-blue-600" aria-label={`Edit ${teacher.name}`}>
                            <FiEdit className="mr-1 text-red-600" /> 
                            Edit
                          </button>
                          <button onClick={() => handleDeleteClick(teacher.id)} className="flex items-center text-red-600" aria-label={`Delete ${teacher.name}`}>
                            <FiTrash2 className="mr-1 text-red-600" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No teachers available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
