import React from 'react'
import event from '../../images/events.png'

export default function ExploreEvent() {
  return (
   <>
   
   <div className='sm:mx-[0px] md:mx-[120px]'>

    <div className='row my-5'>
        <div className="col-md-6 col-sm-12 col-xs-12 ">
            <h1 className='text-[60px] mb-4'  style={{ fontFamily: "'Merriweather', serif" }}>Events at JEC</h1>
               <p style={{ fontFamily: "'Merriweather', serif" }}>Explore a wide range of academic, cultural, and athletic events happening every day at University. Except as noted, all events are open to the public, and most are free. Our dynamic environment, distinct culture, and diverse community foster collaboration and excellence in every corner of the campus and online.</p>        
        </div>
        <div className="col-md-6  col-sm-12 col-xs-12 flex items-center justify-end ">
                  <img src={event} className='h-[270px]' />
        </div>

        </div>

<div className='mt-[60px]'>
<h1 className='text-[40px] mb-4'  style={{ fontFamily: "'Merriweather', serif" }}>Explore Events</h1>
</div>

<div>
    <div className="row my-5">
        <div className="col-md-6 col-sm-12 col-xs-12 flex gap-3">
         <div className=' text-[22px] font-bold text-center'>
            <h1 className='mb-2 text-[22px] font-bold text-red-500'>JAN</h1>
            
            <span className='text-center '>1</span>
         </div>
         <div>
            <h1 className='' style={{ fontFamily: "'Merriweather', serif" }} >LECTURES AND SEMINARS</h1>
            <br></br>
            <h2  className='text-[22px] fw-bold' style={{ fontFamily: "'Merriweather', serif" }}>Events Title</h2>
            <br/>
            <p>Event Description  Except as noted, all events are open to the public, and most are free. Our dynamic environment, distinct culture, and diverse community foster collaboration and excellence in every corner of the campus and onlin</p>
         </div>
        </div>

        <div className="col-md-6 col-sm-12 col-xs-12 flex gap-3">
         <div className=' text-[22px] font-bold text-center'>
            <h1 className='mb-2 text-[22px] font-bold text-red-500'>JAN</h1>
            
            <span className='text-center '>1</span>
         </div>
         <div>
            <h1 className='' style={{ fontFamily: "'Merriweather', serif" }} >LECTURES AND SEMINARS</h1>
            <br></br>
            <h2  className='text-[22px] fw-bold' style={{ fontFamily: "'Merriweather', serif" }}>Events Title</h2>
            <br/>
            <p>Event Description  Except as noted, all events are open to the public, and most are free. Our dynamic environment, distinct culture, and diverse community foster collaboration and excellence in every corner of the campus and onlin</p>
         </div>
        </div>
        
        <div className="col-md-6 col-sm-12 col-xs-12 flex gap-3 mt-5">
         <div className=' text-[22px] font-bold text-center'>
            <h1 className='mb-2 text-[22px] font-bold text-red-500'>JAN</h1>
            
            <span className='text-center '>1</span>
         </div>
         <div>
            <h1 className='' style={{ fontFamily: "'Merriweather', serif" }} >LECTURES AND SEMINARS</h1>
            <br></br>
            <h2  className='text-[22px] fw-bold' style={{ fontFamily: "'Merriweather', serif" }}>Events Title</h2>
            <br/>
            <p>Event Description  Except as noted, all events are open to the public, and most are free. Our dynamic environment, distinct culture, and diverse community foster collaboration and excellence in every corner of the campus and onlin</p>
         </div>
        </div>

        <div className="col-md-6 col-sm-12 col-xs-12 flex gap-3 mt-5">
         <div className=' text-[22px] font-bold text-center'>
            <h1 className='mb-2 text-[22px] font-bold text-red-500'>JAN</h1>
            
            <span className='text-center '>1</span>
         </div>
         <div>
            <h1 className='' style={{ fontFamily: "'Merriweather', serif" }} >LECTURES AND SEMINARS</h1>
            <br></br>
            <h2  className='text-[22px] fw-bold' style={{ fontFamily: "'Merriweather', serif" }}>Events Title</h2>
            <br/>
            <p>Event Description  Except as noted, all events are open to the public, and most are free. Our dynamic environment, distinct culture, and diverse community foster collaboration and excellence in every corner of the campus and onlin</p>
         </div>
        </div>

        <div className='h-[200px] flex items-end justify-end'>
        <button style={{ fontFamily: "'Merriweather', serif" }} href="" className=" me-4 mt-[20px]  py-[20px] px-[38px] rounded-[10px] bg-red-500 text-white hover:bg-blue-500 hover:text-white transition duration-300">P R E V I O U S</button>
        <button style={{ fontFamily: "'Merriweather', serif" }} href="" className=" mt-[20px]  py-[20px] px-[38px] rounded-[10px] bg-red-500 text-white hover:bg-blue-500 hover:text-white transition duration-300">N E X T</button>
        </div>


    </div>
</div>

   

   </div>
   
   
   
   </>
  )
}
