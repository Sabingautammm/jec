import React, { useState } from "react";
import { Link } from 'react-router-dom';
import computer from "../../images/computer.jpg";
import civil from "../../images/civil.jpg";
import electronics from "../../images/electronics.jpg";

const coursesDataList = [
  {
    img: computer,
    title: "Bachelor of Computer Engineering (BCE)",
    description: "Detailed description about Computer Engineering.",
    route: "/alearnmore",
    link: "/alearnmore",
  },
  {
    img: civil,
    title: "Bachelor of Civil Engineering (BCT)",
    description: "Detailed description about Civil Engineering.",
    route: "/alearnmore",
    link: "/alearnmore",
  },
  {
    img: electronics,
    title: "Bachelor of Electronics and Information Engineering (BEI)",
    description:
      "Detailed description about Electronics and Information Engineering.",
    route: "/alearnmore",
    link: "/alearnmore",
  },
];

export default function Events() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setModalIsOpen(false);
  };

  return (
    <>
     

        <div className="mb-5 container-fluid">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {coursesDataList.map((course, index) => (
              <Link to={course.link} key={index} className="flex flex-col">
                <div
                  className="transition-transform transform card hover:scale-105 hover:shadow-xl"
                  style={{
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    height: "100%",
                  }}
                  onClick={() => openModal(course)}
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
   
    </>
  );
}
