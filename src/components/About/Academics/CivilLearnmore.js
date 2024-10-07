import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import people from '../../images/people.png';
import clock from '../../images/clock.png';
import report from '../../images/report.png';
import Civil from './Civil';

export default function CivilLearnMore() {
  const { id } = useParams();
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [availableSeats, setAvailableSeats] = useState(0);
  const [courseIntroduction, setCourseIntroduction] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const token = localStorage.getItem("authToken");
  const [isAdmin, setIsAdmin] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (token) {
        try {
          const response = await axios.get(`https://jec.edu.np/api/user/`, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${token}`,
            },
          });
          setIsAdmin(response.data.is_staff);
        } catch (error) {
          console.error("Error fetching admin status", error);
        }
      }
    };

    fetchAdminStatus();
  }, [token]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`https://jec.edu.np/api/courses/${parseInt(id, 10)}/`, {
          headers: {
           
          },
        });
        const data = response.data;
        setCourseName(data.name);
        setCourseDescription(data.description);
        setAvailableSeats(data.available_seats);
        setCourseIntroduction(data.introduction);
      } catch (error) {
        console.error("Error fetching course data:", error.response ? error.response.data : error.message);
      }
    };

    fetchCourseData();
  }, [id, token]);

  // Fetch all courses
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get(`https://jec.edu.np/api/courses/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error.response ? error.response.data : error.message);
      }
    };

    fetchAllCourses();
  }, [token]);

  const postCourseData = async (courseData) => {
    try {
      const response = await axios.post(`https://jec.edu.np/api/courses/`, courseData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      alert('New course added successfully!');
      console.log("Response:", response.data);
      setCourses([...courses, response.data]); // Update courses state
    } catch (error) {
      console.error("Error posting course data:", error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      name: courseName,
      description: courseDescription,
      available_seats: availableSeats,
      introduction: courseIntroduction,
    };

    if (id === '2' || id === '3') {
      if (isEditing) {
        // Update existing course
        try {
          await axios.put(`https://jec.edu.np/api/courses/${id}/`, courseData, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          alert('Course details updated successfully!');
          setIsEditing(false);
          // Update the courses state after editing
          const updatedCourses = courses.map(course => course.id === parseInt(id, 10) ? { ...course, ...courseData } : course);
          setCourses(updatedCourses);
        } catch (error) {
          console.error("Error updating course data:", error);
        }
      } else if (isAdding) {
        // Add new course
        postCourseData(courseData);
      }
    } else {
      alert('You cannot add new courses beyond ID 3.');
    }
  };

  const courseBenefits = [
    "Experienced faculty and mentors",
    "Hands-on practical labs and projects",
    "Industry-relevant curriculum",
    "Opportunities for internships",
    "State-of-the-art infrastructure",
  ];

  return (
    <div className='w-[92%] mx-auto'>
      <div className='flex items-center justify-center text-center'>
        <div className='w-[380px] h-auto rounded'>
          <h1 className='text-[50px] font-bold'>
            <span className='text-red-500'>{courseName}</span>
          </h1>
        </div>
        <div className='flex items-end justify-end mt-5 text-center'>
          {isAdmin && (
            <>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex px-4 py-2 text-white bg-blue-500 rounded">
                {isEditing ? 'Close Edit' : 'Edit Course'}
              </button>
              <button
                onClick={() => { setIsAdding(!isAdding); setCourseName(''); setCourseDescription(''); setAvailableSeats(0); setCourseIntroduction(''); }}
                className="flex px-4 py-2 ml-2 text-white bg-green-500 rounded">
                {isAdding ? 'Close Add' : 'Add Course'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className='ms-9 mt-9'>
        <h1 className='text-[40px] font-bold'>COURSE <span className='text-red-500'>DESCRIPTION</span></h1>
      </div>
      <div className='flex py-5 text-xl text-justify text-gray-950 ms-9'>
        <p>{courseDescription}</p>
      </div>

      <h1 className='text-[40px] font-bold text-center my-4'>COURSE <span className='text-red-500'>FEATURES</span></h1>

      <div className='container font-bold text-[20px]'>
        <div className='row'>
          <div className='flex flex-col items-center justify-center col-12 col-md-4'>
            <img className="card-img-top rounded-2xl w-[120px]" src={people} alt="Available Seats" />
            <h1 className='text-[30px] font-bold'>AVAILABLE <span className='text-red-500'>SEATS</span></h1>
            <h1 className='text-[30px] mt-3'>{availableSeats}</h1>
          </div>
          <div className='flex flex-col items-center justify-center col-12 col-md-4'>
            <img className="card-img-top rounded-2xl w-[100px]" src={clock} alt="Duration" />
            <h1 className='text-[30px] font-bold text-red-500'>DURATION</h1>
            <h1 className='text-[20px] mt-3'>4 YEARS</h1>
          </div>
          <div className='flex flex-col items-center justify-center col-12 col-md-4'>
            <img className="card-img-top rounded-2xl w-[100px]" src={report} alt="Minimum Qualification" />
            <h1 className='text-[30px] font-bold'>MIN <span className='text-red-500'>QUALIFICATION</span></h1>
            <h1 className='text-[20px] mt-3 text-center'>Intermediate Level/40% <br /> in IOE Entrance.</h1>
          </div>
        </div>
      </div>

      <div className='mt-20 ms-9'>
        <h1 className="text-[40px] font-bold">INTROD<span className="text-red-500">UCTION</span></h1>
      </div>
      <div className='flex my-4 text-xl text-justify text-gray-950 ms-9'>
        <p>{courseIntroduction}</p>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-[40px] font-bold text-center mb-6'>COURSE <span className='text-red-500'>BENEFITS</span></h1>
        <ul className='text-[25px] font-bold text-green-500 ms-3'>
          {courseBenefits.map((benefit, index) => (
            <li key={index} className='flex justify-between'>
              <span className='text-gray-900'>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {(isEditing || isAdding) && (
        <div className='p-5 mt-8 bg-gray-100 rounded'>
          <h2 className='text-2xl font-bold'>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='block mt-2'>Course Name</label>
              <input
                type='text'
                className='w-full p-2 border rounded'
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='block mt-2'>Description</label>
              <textarea
                className='w-full p-2 border rounded'
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='block mt-2'>Available Seats</label>
              <input
                type='number'
                className='w-full p-2 border rounded'
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='block mt-2'>Introduction</label>
              <textarea
                className='w-full p-2 border rounded'
                value={courseIntroduction}
                onChange={(e) => setCourseIntroduction(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='px-4 py-2 mt-4 text-white bg-blue-500 rounded'>
              {isEditing ? 'Update Course' : 'Add Course'}
            </button>
          </form>
        </div>
      )}

      {/* Civil Component to display detailed course info */}
      <Civil courseId={id} />
    </div>
  );
}
