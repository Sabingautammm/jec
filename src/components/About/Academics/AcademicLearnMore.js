import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import people from '../../images/people.png';
import clock from '../../images/clock.png';
import report from '../../images/report.png';

export default function AcademicLearnMore() {
  const [isEditing, setIsEditing] = useState(false);
  const [courseData, setCourseData] = useState({
    name: ' NAME',
    description: 'Course description',
    availableSeats: 0,
    duration: '4 YEARS',
    minQualification: 'Intermediate Level/40% in IOE Entrance.',
    introduction: 'Course introduction',
    benefits: [
      'Variety of Career Opportunities and challenging work.',
      'Benefit Society.',
      'Professional Environment.',
    ],
    structure: 'Course structure details',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  return (
    <div className="container w-full p-6 bg-white rounded-lg shadow-lg">
      <button
        className='px-6 py-2 mb-4 text-white transition bg-red-500 rounded hover:bg-red-600'
        onClick={handleEditToggle}
      >
        {isEditing ? 'Cancel' : 'Edit'}
      </button>

      <div className='text-center'>
        <h1 className='mb-2 text-5xl font-bold'>COURSE <span className='text-red-500'>{courseData.name}</span></h1>
      </div>

      <div className='my-6'>
        <h1 className='text-4xl font-bold'>COURSE <span className='text-red-500'>DESCRIPTION</span></h1>
        <p className='mt-2 text-lg'>{courseData.description}</p>
      </div>

      <h1 className='my-4 text-4xl font-bold text-center'>COURSE <span className='text-red-500'>FEATURES</span></h1>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md'>
          <img className="w-[120px] mb-3" src={people} alt="people" />
          <h1 className='text-2xl font-bold text-center'>AVAILABLE <span className='text-red-500'>SEATS</span></h1>
          <h1 className='mt-2 text-2xl'>{courseData.availableSeats}</h1>
        </div>

        <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md'>
          <img className="w-[100px] mb-3" src={clock} alt="clock" />
          <h1 className='text-2xl font-bold text-center text-red-500'>DURATION</h1>
          <h1 className='mt-2 text-lg'>{courseData.duration}</h1>
        </div>

        <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md'>
          <img className="w-[100px] mb-3" src={report} alt="report" />
          <h1 className='text-2xl font-bold text-center'>MIN <span className='text-red-500'>QUALIFICATION</span></h1>
          <h1 className='mt-2 text-lg text-center'>{courseData.minQualification}</h1>
        </div>
      </div>

      <div className='my-6'>
        <h1 className="text-4xl font-bold">INTROD<span className="text-red-500">UCTION</span></h1>
        <p className='mt-2 text-lg'>{courseData.introduction}</p>
      </div>

      <div className='flex flex-col items-center mb-6'>
        <h1 className='mb-4 text-4xl font-bold text-center'>COURSE <span className='text-red-500'>BENEFITS</span></h1>
        <ul className='text-lg font-bold text-green-500'>
          {courseData.benefits.map((benefit, index) => (
            <li key={index} className='mb-2'>• {benefit}</li>
          ))}
        </ul>
      </div>

      <div className='my-6 text-center'>
        <h1 className='text-4xl font-bold'>COURSE <span className='text-red-500'>STRUCTURE</span></h1>
        <p className='mt-2 text-lg'>{courseData.structure}</p>
      </div>

      {isEditing && (
        <div className='flex flex-col items-center my-6'>
          <h1 className='mb-4 text-4xl font-bold text-center'>Edit Course Details</h1>
          <form className='w-full max-w-md space-y-4'>
            <input
              type='text'
              name='name'
              value={courseData.name}
              onChange={handleChange}
              placeholder='Course Name'
              className='w-full p-2 border rounded-md'
            />
            <textarea
              name='description'
              value={courseData.description}
              onChange={handleChange}
              placeholder='Course Description'
              className='w-full p-2 border rounded-md'
            />
            <input
              type='number'
              name='availableSeats'
              value={courseData.availableSeats}
              onChange={handleChange}
              placeholder='Available Seats'
              className='w-full p-2 border rounded-md'
            />
            <input
              type='text'
              name='duration'
              value={courseData.duration}
              onChange={handleChange}
              placeholder='Duration'
              className='w-full p-2 border rounded-md'
            />
            <input
              type='text'
              name='minQualification'
              value={courseData.minQualification}
              onChange={handleChange}
              placeholder='Min Qualification'
              className='w-full p-2 border rounded-md'
            />
            <input
              type='text'
              name='introduction'
              value={courseData.introduction}
              onChange={handleChange}
              placeholder='Introduction'
              className='w-full p-2 border rounded-md'
            />
            <button type='submit' className='px-4 py-2 text-white transition bg-green-500 rounded-md hover:bg-green-600'>
              Save Changes
            </button>
          </form>
        </div>
      )}

      <div className='flex items-center justify-center mt-4 mb-4'>
        <Link to='/applyOnline'>
          <button className="px-4 py-2 text-sm text-white transition duration-300 bg-blue-600 rounded-lg shadow-md md:text-base hover:bg-blue-700 hover:shadow-lg focus:outline-none">
            Apply Online
          </button>
        </Link>
      </div>
    </div>
  );
}
