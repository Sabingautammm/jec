import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import logo from '../images/jec-logo.png';
import FooterTop from './FooterTop';
// import { Link } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export default function Footer() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <FooterTop />
      <div className='relative pt-4 pb-6 overflow-hidden bg-blue-800' style={{ fontFamily: "'Merriweather', serif" }}>
        <div className='absolute inset-0 opacity-50 bg-gradient-to-r from-blue-800 to-blue-900'></div>
        <div className='absolute inset-0 bg-[linear-gradient(0deg,#000,transparent_10px,transparent_20px,transparent_30px,#000_30px),linear-gradient(90deg,#000,transparent_10px,transparent_20px,transparent_30px,#000_30px)] opacity-20'></div>
        <div className='container relative py-6 text-white' style={{ fontFamily: "'Merriweather', serif" }}>
          <div className='flex flex-wrap -mx-4'>
            <div className='w-full px-4 mb-6 md:w-1/4'>
              <div className='flex items-center justify-center mb-4'>
                <img className="rounded-2xl w-[250px]" src={logo} alt="logo" />
              </div>
              <div className='flex justify-center gap-4 mb-4'>
                <a href='#' aria-label='Facebook' className='text-white transition-colors hover:text-red-600'>
                  <FontAwesomeIcon icon={faFacebook} size='2x' />
                </a>
                <a href='#' aria-label='Instagram' className='text-white transition-colors hover:text-red-600'>
                  <FontAwesomeIcon icon={faInstagram} size='2x' />
                </a>
                <a href='#' aria-label='Twitter' className='text-white transition-colors hover:text-red-600'>
                  <FontAwesomeIcon icon={faTwitter} size='2x' />
                </a>
                <a href='#' aria-label='LinkedIn' className='text-white transition-colors hover:text-red-600'>
                  <FontAwesomeIcon icon={faLinkedin} size='2x' />
                </a>
              </div>
            </div>
            <div className='w-full px-4 mb-6 md:w-1/4'>
              <h1 className='mb-4 text-2xl font-bold'>Useful Links</h1>
              <div className='flex flex-col gap-3'>
                <Link to='/' className='transition-colors hover:text-red-600'>Home</Link>
                <Link to='/onlineApply' className='transition-colors hover:text-red-600'>Admission</Link>
                <Link to='/admission' className='transition-colors hover:text-red-600'>Requirements</Link>
                <Link to='/contact-us' className='transition-colors hover:text-red-600'>Contact Us</Link>
                <Link to='/privacypolicy' className='transition-colors hover:text-red-600'>Privacy Policy</Link>
              </div>
            </div>
            <div className='w-full px-4 mb-6 md:w-1/4'>
              <h1 className='mb-4 text-2xl font-bold'>Our University</h1>
              <div className='flex flex-col gap-3'>
                <Link to='/about/introduction' className='transition-colors hover:text-red-600'>About Us</Link>
                <Link to='/facilities' className='transition-colors hover:text-red-600'>Facilities</Link>
                <Link to='/academics' className='transition-colors hover:text-red-600'>Academics</Link>
                <Link to='/news' className='transition-colors hover:text-red-600'>News</Link>
              </div>
            </div>
            <div className='w-full px-4 mb-6 md:w-1/4'>
              <h1 className='mb-4 text-2xl font-bold'>Contact Details</h1>
              <div className='flex flex-col gap-3'>
                <p>Kupondole, Lalitpur, Nepal</p>
                <p>Phone: 01-5435822</p>
                <p>Email: info@jec.edu.np</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
