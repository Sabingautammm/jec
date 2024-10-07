import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class FooterTop extends Component {
  render() {
    return (
      <div className='w-full bg-blue-100 py-6' style={{ fontFamily: "'Merriweather', serif" }}>
        <div className='flex flex-col justify-center items-center text-center'>
          <h1 className='text-2xl md:text-4xl text-black mb-4'>
            We're here to help you shape the future.
          </h1>
          <p className='text-lg text-gray-700 mb-6'>
            Reach out to us for any inquiries or support. We're always here to assist you.
          </p>
          <Link 
            to='/contact-us' 
            className="
              bg-red-600 text-white 
              py-2 px-6 
              rounded-lg 
              hover:bg-red-700 
              transition-colors 
              duration-300 
              text-lg 
              shadow-md 
              hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    )
  }
}

export default FooterTop
