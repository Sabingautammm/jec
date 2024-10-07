import React from "react";
import { Link } from 'react-router-dom';




export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto mt-2 mb-10">
       <div>
    <div className="container">
        <div className="row">
          <div className="col-md-6 col-2xl-12 col-sm-12 flex text-center md:h-[200px] h-[90px] align-items-center justify-content-center">
            <h1
              className="text-[45px] mb-[7px] "
              style={{ fontFamily: "'Merriweather', serif" }}
            >
               Privacy Policy
            </h1>
          </div>

          <div className="col-md-6 col-2xl-12 col-sm-12 d-flex flex-column  h-[180px] align-items-start justify-content-center">
            <p
              className="text-[18px] mt-[120px]"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
             LEARN ABOUT JEC'S PRIVACY POLICY 
            </p> 
            <Link to='/privacypolicy'>
           
            <button
              style={{ fontFamily: "'Merriweather', serif" }}
              className=" border-solid border-2 border-black text-center flex justify-content-center align-items-center p-[15px] my-4 px-4 rounded-[10px] text-[17px] "
            >
             EXPLORE PRIVACY POLICY
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  );
}
