import React, { useRef, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import students from '../images/jec-students.jpg';
import about from '../images/jec-about.png';
// import leader from '../images/student.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
// import logo from '../images/jec-logo.png';

export default function About() {
  const [countersInView, setCountersInView] = useState({
    students: false,
    professors: false,
    startups: false,
    researchPapers: false,
    researchGrants: false,
    textbooks: false,
    awards: false,
  });

  const countersRef = {
    students: useRef(null),
    professors: useRef(null),
    startups: useRef(null),
    researchPapers: useRef(null),
    researchGrants: useRef(null),
    textbooks: useRef(null),
    awards: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = Object.keys(countersRef).find(
              (refKey) => countersRef[refKey].current === entry.target
            );
            if (key) {
              setCountersInView((prev) => ({ ...prev, [key]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 } // Adjust as needed
    );

    Object.values(countersRef).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(countersRef).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8" style={{ fontFamily: "'Merriweather', serif" }}>
        <div className="sm:mx-0 md:mx-6 lg:mx-16">
          <div className="my-3 text-justify">
            <h1 className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-semibold text-blue-600 transition-transform transform hover:scale-105 text-justify">
              We are a research institution focused on providing massive <br />
              opportunities through value education. University is one of the<br />
              world’s preeminent public universities.
            </h1>
          </div>
          <br />
          <div className="flex flex-col gap-6 md:flex-row md:gap-12 text-justify">
            <div className="md:w-7/12 w-full text-justify">
              <p className="md:text-lg leading-relaxed text-gray-700 text-justify">
                Our impact on individuals, our region, and the world is profound
                whether we are launching young people into a boundless future
                or confronting the grand challenges of our time through undaunted
                research and scholarship. We turn ideas into impact and transform
                lives and our world.
                <br /><br />
                In a sense, University’s greatest invention may be itself an
                unusual concentration of unusual talent, forever reinventing
                itself on a mission to make a better world. That invention is
                powered by individuals: a global community of educators,
                researchers, and learners with different perspectives but a shared
                commitment to serving humanity. Come, join us on the journey.
              </p>
            </div>
            <div className="md:w-5/12 w-full">
              <img 
                src={students}
                className='rounded-lg border-2 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-auto w-full md:w-[400px] lg:w-[500px] transform hover:scale-105'
                alt="Students"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mb-8 mt-24">
        <div
          className="w-full max-w-[1100px] h-[380px] rounded-lg relative overflow-hidden"
          style={{ backgroundImage: `url(${about})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
       
        </div>
      </div>

      <div className='container mb-12'>
        <div className='flex flex-col md:flex-row items-center justify-center text-center'>
          <div className='md:w-1/3 p-4 transition-transform transform hover:scale-105' ref={countersRef.students}>
            <h1 className="text-4xl font-bold text-blue-600">
              {countersInView.students ? <CountUp end={1000} duration={2} /> : '0'}
            </h1>
            <p className="text-lg mt-2 text-gray-700">STUDENTS</p>
          </div>
          <div className='md:w-1/3 p-4 transition-transform transform hover:scale-105' ref={countersRef.professors}>
            <h1 className="text-4xl font-bold text-blue-600">
              {countersInView.professors ? <CountUp end={30} duration={2} /> : '0'}
            </h1>
            <p className="text-lg mt-2 text-gray-700">PROFESSORS</p>
          </div>
          {/* <div className='md:w-1/3 p-4 transition-transform transform hover:scale-105' ref={countersRef.startups}>
            <h1 className="text-4xl font-bold text-blue-600">
              {countersInView.startups ? <CountUp end={50} duration={2} /> : '0'}
            </h1>
            <p className="text-lg mt-2 text-gray-700">STARTUPS</p>
          </div> */}
        </div>
      </div>

      <div className='container mt-12'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='lg:w-1/2 p-4'>
            <h1 className='text-3xl font-bold text-blue-600 mb-4 transition-transform transform hover:scale-105'>Meessage from our Principle</h1>
            <p className='mb-6 text-gray-700 text-justify'>
              Emma J Coleman is the first President and founder of University. She is one of the most influential leaders in the field of education with experience spanning decades. She is now looking over the overall functioning of University and also acts as the head of the Department of Humanities.
            </p>
            {/* <div className='grid grid-cols-2 gap-6'>
              <div className='text-center transition-transform transform hover:scale-105' ref={countersRef.researchPapers}>
                <h1 className="text-4xl font-bold text-blue-600">
                  {countersInView.researchPapers ? <CountUp end={37} duration={2} /> : '0'}
                </h1>
                <h2 className="text-lg mt-2">Research Papers<br />Published</h2>
              </div>
              <div className='text-center transition-transform transform hover:scale-105' ref={countersRef.researchGrants}>
                <h1 className="text-4xl font-bold text-blue-600">
                  {countersInView.researchGrants ? <CountUp end={7} duration={2} /> : '0'}
                </h1>
                <h2 className="text-lg mt-2">Research Grants<br />Received</h2>
              </div>
              <div className='text-center transition-transform transform hover:scale-105' ref={countersRef.textbooks}>
                <h1 className="text-4xl font-bold text-blue-600">
                  {countersInView.textbooks ? <CountUp end={3} duration={2} /> : '0'}
                </h1>
                <h2 className="text-lg mt-2">Textbooks<br />Published</h2>
              </div>
              <div className='text-center transition-transform transform hover:scale-105' ref={countersRef.awards}>
                <h1 className="text-4xl font-bold text-blue-600">
                  {countersInView.awards ? <CountUp end={23} duration={2} /> : '0'}
                </h1>
                <h2 className="text-lg mt-2">Awards &<br />Recognitions</h2>
              </div>
            </div> */}
          </div>
          <div className='lg:w-1/2 p-4'>
            <img src className='w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105' alt="President" />
          </div>
        </div>
      </div>

      {/* <div className='container mt-12 mb-12'>
        <h1 className='text-3xl font-semibold mb-6 text-blue-600'>fACULTYS</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className="card mx-auto transition-transform transform h-[380px] w-[330px] hover:scale-105">
            <img src="..." className="card-img-top h-64 object-cover" alt="..." />
            <div className="card-body">
              <h5 className="card-title text-2xl font-semibold text-blue-600">Card title</h5>
              <p className="text-gray-700">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">LEARN MORE</button>
            </div>
          </div>


          <div className="card mx-auto transition-transform transform h-[380px] w-[330px] hover:scale-105">
            <img src="..." className="card-img-top h-64 object-cover" alt="..." />
            <div className="card-body">
              <h5 className="card-title text-2xl font-semibold text-blue-600">Card title</h5>
              <p className="text-gray-700">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">LEARN MORE</button>
            </div>
          </div>

          <div className="card mx-auto transition-transform transform h-[380px] w-[330px] hover:scale-105">
            <img src="..." className="card-img-top h-64 object-cover" alt="..." />
            <div className="card-body">
              <h5 className="card-title text-2xl font-semibold text-blue-600">Card title</h5>
              <p className="text-gray-700">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">LEARN MORE</button>
            </div>
          </div>

        </div>
      </div> */}

     
    </>
  );
}
