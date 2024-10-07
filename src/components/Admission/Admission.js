import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import required from '../images/requirements.jfif';

export class Admission extends Component {
  render() {
    return (
      <div className='w-full max-w-6xl mx-auto py-8 px-4' style={{ fontFamily: "'Merriweather', serif" }}>
        <div className='text-center mb-6' style={{ color: '#003366' }}>
          <h1 className='text-4xl md:text-5xl font-bold text-red-600 transition-all duration-500 hover:text-red-800'>
            Admission Requirements
          </h1>
        </div>

        <div className='bg-gray-100 p-8 rounded-lg shadow-lg mb-8'>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/2 mb-6 md:mb-0'>
              <p className='font-[12px] md:font-[12px] leading-relaxed text-justify'>

                To gain admission to JEC, candidates must meet several requirements. They should have completed their Intermediate Level examination and achieved a minimum score of 40% in the IOE Entrance Examination. Required documents include the Entrance Score Card, Mark Sheet and Character Certificate of +2, Mark Sheet and Character Certificate of SEE, Migration Certificate, Citizenship Certificate, and two passport-sized photographs. Meeting these criteria ensures eligibility for admission into one of JEC's engineering programs.
              </p>
            </div>

            <div className='md:w-1/2 flex items-center justify-center'>
              <img src={required} className='w-full max-w-sm rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105' alt="Requirements" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
            Courses We Offer
          </h1>
          <ul className="text-lg md:text-xl font-semibold text-gray-800 space-y-4">
            <li className="text-red-600">1. B.E Civil</li>
            <li className="text-red-600">2. B.E Computer</li>
            <li className="text-red-600">3. B.E Electronics & Information Engineering</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
            Eligibility Criteria
          </h1>
          <ul className="text-lg md:text-xl font-semibold text-gray-800 space-y-4">
            <li>
              Candidates must pass 10+2 with a minimum of 45% to 50% in Physics, Chemistry, and Mathematics overall.
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
            Entrance Requirements
          </h1>
          <ul className="text-lg md:text-xl font-semibold text-gray-800 space-y-4 mb-6">
            <li>
              The undergraduate Engineering Entrance Exam is conducted each year by Tribhuvan University. To get admitted into any constituent or private engineering college affiliated with TU, you need to pass and score a minimum of 40%.
            </li>
          </ul>
          <Link to="https://entrance.ioe.edu.np/">
            <button className="px-6 py-3 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold text-lg transition-colors duration-300 shadow-md hover:shadow-lg">
              Learn More
            </button>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
            Admission Requirements
          </h1>
          <ul className="list-disc text-lg md:text-xl font-semibold text-gray-800 space-y-4 pl-6">
            <li>
              Students must have passed their Intermediate Level examination.
            </li>
            <li>
              Students must score at least 40% in IOE Entrance Examination.
            </li>
            <li>
              Entrance Score Card <span className="text-red-600">(Color Printed or Original)</span>
            </li>
            <li>
              Mark Sheet/Transcript of +2 or equivalent <span className="text-red-600">(Copy)</span>
            </li>
            <li>
              Character Certificate of +2 or equivalent <span className="text-red-600">(Copy)</span>
            </li>
            <li>
              Mark Sheet of SEE or equivalent <span className="text-red-600">(Copy)</span>
            </li>
            <li>
              Character Certificate of SEE or equivalent <span className="text-red-600">(Copy)</span>
            </li>
            <li>
              Migration Certificate <span className="text-red-600">(Original)</span>
            </li>
            <li>
              Citizenship Certificate <span className="text-red-600">(Copy)</span>
            </li>
            <li>
              Two passport-sized photographs of the applicant
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Admission;
