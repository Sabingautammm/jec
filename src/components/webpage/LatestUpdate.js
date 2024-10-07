import React from "react";

const LatestUpdate = () => {
  return (
    <div>
      <div className="container mx-auto mt-[180px] md:mt-[160px] w-full max-w-[1150px] mb-[50px] px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <h1
              className="text-[18px] sm:text-[20px] text-center md:text-left font-serif"
            >
              Latest Updates
            </h1>
          </div>
          <div className="md:w-2/3">
            <h1
              className="text-[14px] sm:text-[16px] mt-4 md:mt-0 text-center font-serif"
            >
              University is implementing a phased recovery of university
              operations. We are currently in Phase 2 of the restart process.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestUpdate;
