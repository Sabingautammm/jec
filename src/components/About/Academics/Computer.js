import React from 'react'

export default function Computer() {
  return (
    <div className='container'>
    <div className='row'>
      {/* First Year */}
      <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
        <div className='h-[60px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mb-6 rounded-lg shadow-lg'>
          <h1 className='text-[32px] font-extrabold text-center text-white'>FIRST YEAR</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester I
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Basic Eletrical Engineering', 'Computer Programming', 'Engineering Drewing I', 'Engineering Mathematics I', 'Engineering Physics', 'Applied Mechanics'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>I/I</span> {course}
                </li>
              ))}
            </ul>
          </div>
  
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester II
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Basic Electronics Engineering', 'Engineering Chemistry', 'Engineering Drawing II', 'Basic Mathematics II', 'Fundamentails of Thermodynamics And Head Transfer', 'Workshop  Technology'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>I/II</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      {/* Second Year */}
      <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
        <div className='h-[60px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mb-6 rounded-lg shadow-lg'>
          <h1 className='text-[32px] font-extrabold text-center text-white'>SECOND YEAR</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester I
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Engineering Mathematics III', 'Digital Logic', 'Electric Circuit Theory', 'Electromagnetics', 'Electronic Devices and Circuits', 'Object Oriented Programming', 'Theory Of Computation'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>II/I</span> {course}
                </li>
              ))}
            </ul>
          </div>
  
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester II
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Data structure and  Algorithms', 'Microprocessors', 'Applied Mathematics', 'Discreate Structure', 'Eletrical Machines', 'Instrumentation I', 'Numerical Methods'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>II/II</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  
    <div className='mt-5 row'>
      {/* Third Year */}
      <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
        <div className='h-[60px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mb-6 rounded-lg shadow-lg'>
          <h1 className='text-[32px] font-extrabold text-center text-white'>THIRD YEAR</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester I
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Probability And Statistics', 'Communication English', 'Computer Graphics', 'Computer Organization And Architecture', 'Data communication', 'Instrumentation II', 'Software Enginerring'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>III/I</span> {course}
                </li>
              ))}
            </ul>
          </div>
  
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester II
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Minor Project', 'Artifical Intelligence', 'Database Management System', 'Embedded System', 'Object Oriented Analusis And Design', 'Operating System', 'Engineering Economics'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>III/II</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  
      {/* Fourth Year */}
      <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
        <div className='h-[60px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mb-6 rounded-lg shadow-lg'>
          <h1 className='text-[32px] font-extrabold text-center text-white'>FOURTH YEAR</h1>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester I
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Computer Network And Security(CNS)', 'Energy,Enviroment And Society', 'Projet', 'Digital Signal Analysis And Processing', 'Distibuted System', 'Electivel', 'Organization And Management','Project Management'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>IV/I</span> {course}
                </li>
              ))}
            </ul>
          </div>
  
          <div className='col-12 col-md-6 col-sm-12 col-xs-12'>
            <h1 className='text-center text-[28px] font-semibold mb-3'>Semester II
              <span className='text-[18px] text-gray-600 block'>- 18 credit hours</span>
            </h1>
            <ul className='text-[20px] space-y-2'>
              {['Information System', 'Project-II', '', 'Elective-II', 'Elective-III', 'Engineering Professional Practice', 'Internet And Intranet','Simulation And Modeling'].map(course => (
                <li key={course} className='p-2 transition-all rounded-lg hover:bg-gray-100'>
                  <span className='font-bold me-2'>IV/II</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}
