import React from 'react'
import news from '../images/news.jfif';

const NewsBody = () => {
  return (
    <>
        <div className='container-fluid mt-[70px]'>
          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <p className='text-lg text-justify' style={{ fontFamily: "'Merriweather', serif" }}>
                Welcome to the JEC News & Updates page, your go-to source for the latest happenings and important announcements.
                Stay tuned for updates on upcoming events, recent achievements, and important changes within our community. We’re excited to share news that highlights our progress and celebrates our collective efforts.
              </p>
            </div>

            <div className='col-sm-12 col-md-6 flex items-end justify-end'>
              <img src={news} className='h-[200px] rounded-[10px] shadow-lg transition-transform duration-500 transform hover:scale-105' alt="Learn More" />
            </div>
          </div>
        </div>
    </>
  )
}

export default NewsBody