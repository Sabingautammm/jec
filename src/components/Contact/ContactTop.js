import React, { Component } from "react";

export class ContactTop extends Component {
  render() {
    return (
      <>
        <div className="flex flex-wrap justify-center items-start w-[88%] mx-auto my-3">
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0 text-xl" style={{ fontFamily: "'Merriweather', serif" }}>
            <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Merriweather', serif" }}>Get in Touch</h1>
            <ul className="space-y-4">
              <li>
                <span className="text-slate-400 text-2xl">Janakpur Engineering College</span>
                <br />
                Lalitpur 44600
              </li>
              <li>
                <span className="text-slate-400 text-2xl">Telephone</span> <br />
                015435822
              </li>
              <li>
                <span className="text-slate-400 text-2xl">Email</span> <br />
                <a href="mailto:info@jec.edu.np" className="text-blue-500">
                  info@jec.edu.np
                </a>
              </li>
              <li>
                <span className="text-slate-400 text-2xl">Work Hours</span> <br />
                8:00 am to 5:00 pm
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/3 px-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7065.981226302556!2d85.31243600000002!3d27.686685!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb194be4c7eb7f%3A0xc69a5e26c21fb3ef!2sJanakpur%20Engineering%20College!5e0!3m2!1sen!2snp!4v1721615870386!5m2!1sen!2snp"
              className="w-full h-80 md:h-96 border-0 mt-8 md:mt-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </>
    );
  }
}

export default ContactTop;
