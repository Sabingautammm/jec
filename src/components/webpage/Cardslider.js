import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import computer from '../images/computer.jpg';
import civil from '../images/civil.jpg';
import electronics from '../images/electronics.jpg';

const ImageSlider = () => {
  const images = [
    {
      src: computer,
      alt: "View from inside",
      title: "View from inside",
      details: "Starting in Fall 2022 Python Programming for Data Science Online 4 Year Course"
    },
    {
      src: civil,
      alt: "Entrance",
      title: "Entrance",
      details: "Starting in Spring 2022 Analyzing Data Without Excel Online 4 Year Course"
    },
    {
      src: electronics,
      alt: "Public Library",
      title: "Public Library",
      details: "Starting in Fall 2022 Databases: Advanced Topics in SQL Online & Offline 4 Year Course"
    },
   
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-11/12 mx-auto overflow-hidden max-w-[90%] my-8">
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative border rounded-lg shadow-md">
            <img
              className="w-full h-64 object-cover rounded-t-lg"
              src={image.src}
              alt={image.alt}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{image.title}</h3>
              <p className="text-gray-600 text-sm">{image.details}</p>
            </div>
          </div>
        ))}
      </div>
      <FaAngleLeft
        className="fa fa-4x absolute top-1/2 transform -translate-y-1/2 left-2 text-4xl text-gray-700 bg-white bg-opacity-70 rounded-full p-2 cursor-pointer"
        onClick={goToPrevious}
      />
      <FaAngleRight
        className="fa fa-4x absolute top-1/2 transform -translate-y-1/2 right-2 text-4xl text-gray-700 bg-white bg-opacity-70 rounded-full p-2 cursor-pointer"
        onClick={goToNext}
      />
    </div>
  );
};

export default ImageSlider;