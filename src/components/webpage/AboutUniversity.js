import React, { useState } from "react";
import { Link } from 'react-router-dom';



export default function AboutUniversity() {
  
  return (
    <>
      <div className="container">
        <div className="mb-20 row">
          <div className="col-md-6 col-2xl-12 col-sm-12 flex text-center md:h-[210px] h-[100px] align-items-center justify-content-center">
            <h1
              className="text-[45px] mb-[10px] "
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              About College
            </h1>
          </div>

          <div className="col-md-6 col-2xl-12 col-sm-12 d-flex flex-column  h-[210px] align-items-start justify-content-center">
            <p
              className="text-[18px] mt-[120px]"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              A place for learning, discovery, innovation, expression and
              discourse, the campus is full of life and is always active with
              events and get-togethers.
            </p>
            <Link to='/about/introduction'>
           
            <button
              style={{ fontFamily: "'Merriweather', serif" }}
              className=" border-solid border-2 border-black text-center flex justify-content-center align-items-center p-[15px] my-4 px-4 rounded-[10px] text-[17px] "
            >
              ABOUT COLLEGE
            </button>
            </Link>
          </div>
        </div>
      </div>

 
    </>
  );
}
