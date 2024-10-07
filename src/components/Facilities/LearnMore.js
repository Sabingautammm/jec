import React from 'react';
import wifi from '../images/wifi.png';

export default function LearnMore() {
  return (
    <div className='px-4 md:px-12 lg:px-24'>
      <div className='mt-5 mb-4 text-center'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary' style={{ fontFamily: "'Merriweather', serif" }}>FACILITIES OF JEC</h1>
      </div>
      
      <div className='mb-1 text-center'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-secondary' style={{ fontFamily: "'Merriweather', serif" }}>WIFI</h2>
      </div>

      <div className='bg-light p-5 rounded-lg shadow-md'>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/2 mt-5 flex flex-col items-center justify-center'>
            <p className='text-base md:text-lg lg:text-xl text-justify leading-7' style={{ fontFamily: "'Merriweather', serif" }}>
              Janakpur Engineering College (JEC) provides comprehensive Wi-Fi facilities designed to support its academic community by ensuring campus-wide high-speed internet access. These facilities enable seamless connectivity across classrooms, libraries, laboratories, and common areas, supporting multiple devices while maintaining secure access through robust encryption and authentication protocols. The high-speed internet fosters an enhanced learning environment by enabling students and faculty to access digital resources, online educational tools, and up-to-date information, thereby facilitating interactive and engaging teaching and research activities.
            </p>
          </div>
          <div className='w-full md:w-1/2 mt-5 flex items-center justify-center'>
            <img className="rounded-2xl w-40 md:w-48 lg:w-56 shadow-lg" src={wifi} alt="Wi-Fi" />
          </div>
        </div>

        <div className='mt-5 text-sm md:text-base lg:text-lg leading-8' style={{ fontFamily: "'Merriweather', serif" }}>
          <p>
            Janakpur Engineering College (JEC) provides comprehensive Wi-Fi facilities designed to support its academic community by ensuring campus-wide high-speed internet access. These facilities enable seamless connectivity across classrooms, libraries, laboratories, and common areas. The Wi-Fi network supports multiple devices simultaneously while maintaining secure access through robust encryption and authentication protocols.
          </p>
          <p>
            The high-speed internet access at JEC fosters an enhanced learning environment by enabling students and faculty to access digital resources, online educational tools, and up-to-date information. This connectivity facilitates interactive and engaging teaching and research activities. Students can easily collaborate on projects, access e-books and online journals, and participate in virtual classes and seminars. Faculty members benefit from the ability to integrate digital content into their lectures, conduct research with the latest data, and communicate efficiently with their peers and students.
          </p>
          <p>
            Moreover, the Wi-Fi facilities extend beyond academic buildings to include common areas such as student lounges, cafeterias, and outdoor spaces, ensuring that students have the flexibility to study and work in various environments. This ubiquitous connectivity helps create a vibrant academic atmosphere where learning can take place anytime and anywhere on campus.
          </p>
          <p>
            The college's commitment to providing high-quality internet services reflects its dedication to leveraging technology to enhance the educational experience. By offering reliable and secure Wi-Fi access, JEC ensures that its students and faculty are well-equipped to meet the demands of modern education and research, ultimately contributing to their academic success and professional development.
          </p>
        </div>
      </div>
    </div>
  );
}
