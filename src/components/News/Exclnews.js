import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Exclusive.css'; 
const Exclnews = ({ newsItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(true); 
  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handleNextClick = () => {
    if (currentIndex < newsItems.length - 1) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const handleCloseOverlay = () => {
    setShowOverlay(false); 
  };
  if (!newsItems || newsItems.length === 0 || !showOverlay) {
    return null;
  }
  const reversedNewsItems = [...newsItems].reverse();
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-black bg-opacity-70 backdrop-blur-md"
      aria-hidden={!showOverlay}
    >
      <div className="relative max-w-md p-6 mx-auto transition-transform duration-500 transform scale-100 bg-white shadow-lg rounded-xl">
        
        <button
          onClick={handleCloseOverlay}
          aria-label="Close overlay"
          className="absolute z-50 p-2 text-gray-600 transition-transform transform bg-gray-200 rounded-full top-3 right-3 hover:bg-gray-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          <Swiper
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            className="swiper-container"
          >
            {reversedNewsItems.map((news) => (
              <SwiperSlide key={news.id} className="news-slide">
                <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md news-item">
                  <a href={news.photo} target="_blank" rel="noopener noreferrer">
                    <img
                      src={news.photo}
                      alt="news"
                      className="mx-auto mb-4 responsive-image"
                      style={{ width: 'auto', height: 'auto', maxHeight: '300px' }}
                    />
                  </a>
                  <p className="text-gray-700">{news.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Left arrow inside Exclnews component */}
          {currentIndex > 0 && (
            <div className="swiper-button-prev" style={{ ...arrowStyle, left: '10px' }} onClick={handlePrevClick}>
              &#10094;
            </div>
          )}
          
          {/* Right arrow inside Exclnews component */}
          {currentIndex < reversedNewsItems.length - 1 && (
            <div className="swiper-button-next" style={{ ...arrowStyle, right: '10px' }} onClick={handleNextClick}>
              &#10095;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const arrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
  cursor: 'pointer',
  zIndex: 10,
  background: 'rgba(255, 255, 255, 0.7)',
  padding: '10px',
  borderRadius: '50%',
};
export default Exclnews;
