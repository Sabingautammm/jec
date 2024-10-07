import React from "react";

const Updates = () => {
  return (
    <>
      <div className="flex flex-col items-center bg-green-500 ">
        <div className=" z-[-1] absolute top-[calc(91vh-15px)] bg-blue-500 sm:h-[180px] md:h-[150px] w-full max-w-[1100px] flex flex-wrap items-center justify-center gap-8 md:gap-[80px] rounded-[20px] p-4 md:p-0">
          <span className="text-center text-white">
            <h1 className="text-[40px] md:text-[50px] font-bold">1000+</h1>
            <h1 className="text-[16px] md:text-[20px] font-bold">STUDENTS</h1>
          </span>
          <span className="text-center text-white">
            <h1 className="text-[40px] md:text-[50px] font-bold">30+</h1>
            <h1 className="text-[16px] md:text-[20px] font-bold">PROFESSORS</h1>
          </span>
          {/* <span className="text-center text-white">
            <h1 className="text-[40px] md:text-[50px] font-bold">50+</h1>
            <h1 className="text-[16px] md:text-[20px] font-bold">STARTUPS</h1>
          </span> */}
          <span className="text-center text-white">
            <h1 className="text-[40px] md:text-[50px] font-bold">3</h1>
            <h1 className="text-[16px] md:text-[20px] font-bold">COURSES</h1>
          </span>
        </div>
      </div>
    </>
  );
};

export default Updates;
