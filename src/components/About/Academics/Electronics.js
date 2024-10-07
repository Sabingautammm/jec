import React from 'react'

export default function Electronics() {
  return (
 <>
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
            {['Basic Eletrical Engineering', 'Computer programming', 'Engineering Drawing I', 'Engineering Mathematics I', 'Engineering Physics', 'Digital Logic'].map(course => (
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
            {['Engineering Chemistry', 'Engineering Mathmatics II', 'Microprocessors', 'Object Oriented Programming', 'Workshop Technology', 'Coming Soon.......'].map(course => (
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
            {['Probability And Statistics', 'Control System', 'Engineering Mathematics III', 'Electromagnetics', 'Electronic Devices And Circuits', 'comming soon.........'].map(course => (
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
            {['Data Stracture And Algorithms', 'Advanced Electronics', 'Applied Mathematics', 'Computer Graphics', 'Discreate Structure', 'Numerical Methods', ].map(course => (
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
            {['Computer Network And Security(CNS)', 'Computer Organization And  Architecture', 'Database Management System', 'Engineering Economics', 'Filter Design', 'Operating System'].map(course => (
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
            {['Communication English', 'Embedded System', 'Minor Project', 'Project Managements', 'Propagation And Antenna','comming soon......'].map(course => (
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
            {['Project', 'Rf and Microwave Engineering', 'Wireless Communications', 'Artifical Intelligence', 'Digital Signal Analysis And Processing', 'Electivel', 'organization And Managements'].map(course => (
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
            {['Energy,Enviroments And Socity', 'Information Systems', 'Project-II', 'Elective-II', 'Elective-III', 'Digital Signal Processing', 'Enginerring Professional Practice','Telecommunication'].map(course => (
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

 
 
 
 
 
 </>
  )
}
