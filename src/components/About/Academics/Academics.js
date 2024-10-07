import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import computer from "../../images/computer.jpg";
import civil from "../../images/civil.jpg";
import electronics from "../../images/electronics.jpg";
import learnMoreImage from "../../images/aLearnmore.png";

// Example course data
// Example course data with unique identifiers
const coursesData = [
  {
    id: 1, // Add an ID for the course
    img: computer,
    title: "Bachelor of Computer Engineering (BCE)",
    description: "Detailed description about Computer Engineering.",
    route: "/course-learn-more/1", // Updated route to include id
  },
  {
    id: 2, // Add an ID for the course
    img: civil,
    title: "Bachelor of Civil Engineering (BCT)",
    description: "Detailed description about Civil Engineering.",
    route: "/course-learn-more/2", // Updated route to include id
  },
  {
    id: 3, // Add an ID for the course
    img: electronics,
    title: "Bachelor of Electronics and Information Engineering (BEI)",
    description: "Detailed description about Electronics and Information Engineering.",
    route: "/course-learn-more/3", // Updated route to include id
  },
];

  
export default function Academics() {
  return (
    <>
      <div className="sm:mx-[20px] md:mx-[120px] w-[94%] mx-auto">
   
        <div
          className="mt-5"
          style={{ fontFamily: "'Merriweather', serif", color: "#003366" }}
        >
          <div>
            <h1 className="text-[40px]" style={{ color: "#D80027" }}>
              Become a part of <br />
              Janakpur Engineering College.
            </h1>
          </div>
          <div className="flex items-end justify-end mt-3 text-end">
            <p>
              Restless learners change
              <br /> the world.
            </p>
          </div>
        </div>

        <div className="container-fluid mt-[70px]">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p
                style={{ fontFamily: "'Merriweather', serif" }}
                className="text-justify"
              >
                Janakpur Engineering College offers 3 courses across various
                specializations that provoke intellectual and intuitive learning
                among students. We at Janakpur Engineering College believe that
                peer learning is essential along with communication, analytic,
                and problem-solving skills. Instructors from around the world
                teach thousands of students in our college. We provide the tools
                and skills to teach what you love.
              </p>
            </div>

            <div className="flex items-end justify-end col-sm-12 col-md-6">
              <img
                src={learnMoreImage}
                className="h-[220px] transition-transform transform hover:scale-105"
                alt="Learn More"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <h1
              className="text-[30px]"
              style={{ fontFamily: "'Merriweather', serif", color: "#003366" }}
            >
              "The whole purpose of education is to
              <br /> turn mirrors into windows"
            </h1>
          </div>
          {/* <div
            id="stats"
            className="flex items-end justify-end gap-4 mt-3 text-end"
          >
            <div>
              <h1 className="text-[50px] text-center ms-3">
                {isVisible ? <CountUp end={92} duration={2} /> : "92%"}%
              </h1>
              <h1
                style={{ fontFamily: "'Merriweather', serif" }}
                className="font-bold"
              >
                GRADUATION RATE
              </h1>
            </div>
            <div>
              <h1 className="text-[50px] text-center">
                {isVisible ? <CountUp end={85} duration={2} /> : "85%"}%
              </h1>
              <h1
                style={{ fontFamily: "'Merriweather', serif" }}
                className="font-bold"
              >
                EMPLOYMENT RATE
              </h1>
            </div>
          </div> */}
        </div>
        <div className="my-[60px]">
        <h1
          style={{ fontFamily: "'Merriweather', serif", color: "#D80027" }}
          className="text-[45px]"
        >
          Courses Offered
        </h1>
      </div>

        <div className="mb-5 container-fluid">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {coursesData.map((course, index) => (
              <Link
                to={course.route} // Use dynamic route
                key={index}
                className="flex flex-col"
              >
                <div
                  className="transition-transform transform card hover:scale-105 hover:shadow-xl"
                  style={{
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <img
                    src={course.img}
                    className="transition-transform transform rounded-lg card-img-top hover:scale-110"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={course.title}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{
                        fontFamily: "'Merriweather', serif",
                        fontSize: "20px",
                        color: "#003366",
                      }}
                    >
                      {course.title}
                    </h5>
                    <p style={{ fontSize: "14px", color: "#757575" }}>
                      Starting in Fall 2022
                    </p>
                    <h1 style={{ fontSize: "16px", fontWeight: "normal" }}>
                      Duration: 4 Years
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
