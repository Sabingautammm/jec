import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className='mt-5'>
      <div className='text-center mt-3'>
        <h1 className='font-bold text-4xl'>
          <span className='text-gray-800'>SEND</span>
          <span className='text-red-500 ms-2'>US</span>
          <span className='text-gray-800 ms-2'>AN</span>
          <span className='text-red-500 ms-2'>EMAIL</span>
        </h1>
      </div>
      <form className='max-w-2xl mx-auto mt-1 mb-3 p-8 bg-white rounded-lg shadow-lg' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='flex flex-col'>
            <label htmlFor="firstName" className='mb-2 font-medium text-gray-800'>FIRST NAME</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              className={`p-2 border-2 rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className='text-red-500 mt-1'>{errors.firstName}</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="lastName" className='mb-2 font-medium text-gray-800'>LAST NAME</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              className={`p-2 border-2 rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className='text-red-500 mt-1'>{errors.lastName}</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="email" className='mb-2 font-medium text-gray-800'>EMAIL</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your Email"
              className={`p-2 border-2 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className='text-red-500 mt-1'>{errors.email}</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="address" className='mb-2 font-medium text-gray-800'>ADDRESS</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your Address"
              className={`p-2 border-2 rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className='text-red-500 mt-1'>{errors.address}</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="phone" className='mb-2 font-medium text-gray-800'>PHONE NUMBER</label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter your Phone"
              className={`p-2 border-2 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className='text-red-500 mt-1'>{errors.phone}</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="subject" className='mb-2 font-medium text-gray-800'>SUBJECT</label>
            <select
              name="subject"
              id="subject"
              className={`p-2 border-2 rounded-md ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="" disabled>Select Subject</option>
              <option value="B.E. CIVIL">B.E. CIVIL</option>
              <option value="B.E. COMPUTER">B.E. COMPUTER</option>
              <option value="B.E. ELECTRONICS AND INFORMATION ENGINEERING">B.E. ELECTRONICS AND INFORMATION ENGINEERING</option>
            </select>
            {errors.subject && <span className='text-red-500 mt-1'>{errors.subject}</span>}
          </div>
          <div className='flex flex-col col-span-1 md:col-span-2'>
            <label htmlFor="message" className='mb-2 font-medium text-gray-800'>MESSAGE</label>
            <textarea
              name="message"
              id="message"
              placeholder="Enter your message"
              className={`p-2 border-2 rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
            {errors.message && <span className='text-red-500 mt-1'>{errors.message}</span>}
          </div>
          <div className='col-span-1 md:col-span-2 text-center mt-6'>
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md transition duration-300 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {isSubmitted && !isSubmitting && <p className='text-green-500 mt-2'>Message sent successfully!</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
