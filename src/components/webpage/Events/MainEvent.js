import React from 'react'
import { Link } from 'react-router-dom';
export default function MainEvent() {
  return (
    <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center mb-10 row md:flex-row">
          <div className="col-md-6 flex justify-center md:h-[300px] h-[70px]">
            <h1
              className="text-[30px] sm:text-[45px] mb-[10px] sm:mb-[1px] text-center"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Happening Now
            </h1>
          </div>
          <div className="col-md-6 flex flex-col h-[300px] justify-center">
            <p
              className="text-[16px] sm:text-[18px] mb-4"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              At University’s beautiful campus, you’ll find a diverse and
              welcoming community that will teach you life skills along with
              having fun.
            </p>
            <div className="flex items-center justify-center">
              <Link to="/exploreEvents">
                <button
                  style={{ fontFamily: "'Merriweather', serif" }}
                  className="border-solid border-2 border-black text-center flex justify-center items-center p-[10px] sm:p-[15px] my-4 px-4 rounded-[10px] text-[15px] sm:text-[17px] transition duration-300 hover:bg-blue-600 hover:text-white"
                >
                  EXPLORE EVENTS
                </button>
              </Link>
            </div>
          </div>
        </div>
        </div>
  )
}
