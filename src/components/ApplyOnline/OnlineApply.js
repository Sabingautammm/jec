import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apply from '../images/apply.jfif';

export default function OnlineApply() {
  const [formData, setFormData] = useState({
    full_name: '',
    gender: '',
    date_of_birth: '',
    phone_number: '',
    email: '',
    address: '',
    photo: null,
    interested_course: '',
    ioe_roll_no: '',
    ioe_rank: '',
    transcript: null,
    migration: null,
    character: null,
    agreement: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
      checkSubmissionStatus(token);
    } else {
      setIsLoggedIn(false);
      // navigate('/login'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  const checkSubmissionStatus = async (token) => {
    try {
      const response = await axios.get('https://jec.edu.np/api/application-forms/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      if (response.data.length > 0) {
        setHasSubmitted(true);
      }
    } catch (error) {
      console.log(error);
      setErrors({ checkStatus: 'Error checking form submission status.' });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      // if (!isLoggedIn) {
      //   alert('You must be logged in to submit the form.');
      //   return;
      // }

      const formDataToSend = new FormData();
      formDataToSend.append('user', user); 
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      }

      try {
        console.log(formData);
        const token = localStorage.getItem('authToken');
        const response = await axios.post('https://jec.edu.np/api/application-forms/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Token ${token}`,
          },
        });
        setHasSubmitted(true);
        alert('You have successfully applied.');
        navigate('/');
      } catch (error) {
        console.log(error);
        setErrors({ form: 'There was an error submitting the form. Please try again.' });
      }
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.full_name) newErrors.full_name = 'Full Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of Birth is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.interested_course) newErrors.interested_course = 'Interested Course selection is required';
    if (!formData.ioe_roll_no) newErrors.ioe_roll_no = 'IOE Roll Number is required';
    if (!formData.ioe_rank) newErrors.ioe_rank = 'IOE Rank is required';
    if (!formData.agreement) newErrors.agreement = 'You must agree to the declaration';
    if (!formData.email) newErrors.email = 'email is required';
    if (!formData.phone_number) newErrors.phone_number = 'phone number is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  return (
    <div className='container w-[94%] mx-auto p-6'>
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-blue-700' style={{ fontFamily: "'Merriweather', serif" }}>
          APPLY YOUR JEC <br />ADMISSION FORM ONLINE
        </h1>
      </div>

      <div className='flex flex-col items-center text-justify md:flex-row md:justify-between'>
        <div className='mb-8 md:w-1/2 md:mb-0'>
          <p className='text-lg' style={{ fontFamily: "'Merriweather', serif" }}>
            Applying for admission to Janakpur Engineering College (JEC) is now easier than ever with our online application form. Prospective students can visit our official website, fill out the required information, upload necessary documents, and submit the form from the comfort of their homes. This streamlined process is designed to save time and ensure that all applications are processed efficiently. Don’t miss the opportunity to be part of JEC’s vibrant academic community. Apply online today and take the first step towards a promising engineering career!
          </p>
        </div>
        <div className='flex justify-center md:w-1/2'>
          <img src={apply} alt="JEC Facilities" className='w-full max-w-lg rounded-lg shadow-lg' />
        </div>
      </div>

      <div className='my-4'>
        <h1 className='text-3xl font-bold text-center text-blue-700' style={{ fontFamily: "'Merriweather', serif" }}>
          APPLICATION FORM
        </h1>
      </div>

      <form className='space-y-8 border border-gray-400 rounded-lg shadow-md py-5 w-[94%] mx-auto px-7' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-8 md:flex-row'>
          <div className='block md:w-1/2'>
            <label className='block mb-2 text-lg font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              FULL NAME:
              <input
                type='text'
                name='full_name'
                value={formData.full_name}
                onChange={handleChange}
                className={`block w-full border ${errors.full_name ? 'border-red-700' : 'border-blue-700'} rounded-lg px-4 py-2 mt-2`}
                required
              />
              {errors.full_name && <p className='text-red-700'>{errors.full_name}</p>}
            </label>

            <div className='mb-4'>
              <label className='block mb-2 text-lg font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
                GENDER:
              </label>
              <div className='flex flex-col gap-4 md:flex-row'>
                <label className='flex items-center'>
                  <input type="radio" name="gender" value="M" onChange={handleChange} className='mr-2' required />
                  MALE
                </label>
                <label className='flex items-center'>
                  <input type="radio" name="gender" value="F" onChange={handleChange} className='mr-2' required />
                  FEMALE
                </label>
                <label className='flex items-center'>
                  <input type="radio" name="gender" value="O" onChange={handleChange} className='mr-2' required />
                  OTHERS
                </label>
              </div>
              {errors.gender && <p className='text-red-700'>{errors.gender}</p>}
            </div>

            <label className='block mb-2 text-lg font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              DATE OF BIRTH:
              <input
                type='date'
                name='date_of_birth'
                value={formData.date_of_birth}
                onChange={handleChange}
                className='block w-full px-4 py-2 mt-2 border border-blue-700 rounded-lg'
                required
              />
              {errors.date_of_birth && <p className='text-red-700'>{errors.date_of_birth}</p>}
            </label>
          {/* </div> */}

          {/* <div className='flex flex-col items-center md:w-1/2'> */}
            <label className='mb-2 text-lg font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              PHOTO
              <input
                type='file'
                name='photo'
                onChange={handleChange}
                className='block mt-2'
              />
              {errors.photo && <p className='text-red-700'>{errors.photo}</p>}
            </label>
            <label className='block mt-3 mb-2 text-lg font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              ADDRESS:
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='block w-full px-4 py-2 mt-2 border border-blue-700 rounded-lg'
                required
              />
              {errors.address && <p className='text-red-700'>{errors.address}</p>}
            </label>
            <label className='block mt-3 mb-2 text-lg font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              EMAIL:
              <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='block w-full px-4 py-2 mt-2 border border-blue-700 rounded-lg'
                required
              />
              {errors.email && <p className='text-red-700'>{errors.email}</p>}
            </label>
            <label className='block mt-3 mb-2 text-lg font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              Phone Number:
              <input
                type='text'
                name='phone_number'
                value={formData.phone_number}
                onChange={handleChange}
                className='block w-full px-4 py-2 mt-2 border border-blue-700 rounded-lg'
                required
              />
              {errors.phone_number && <p className='text-red-700'>{errors.phone_number}</p>}
            </label>
          </div>
        </div>

        <div className='text-left'>
          <h1 className='text-2xl font-bold text-red-700' style={{ fontFamily: "'Merriweather', serif" }}>
            Choose The Interested interested_course
          </h1>
          <div className='flex flex-col items-start justify-start gap-5 mt-4 md:flex-row'>
            <label className='flex'>
              <input type="radio" name="interested_course" value="civil" onChange={handleChange} className='mr-2' required />
              B.E Civil
            </label>
            <label className='flex'>
              <input type="radio" name="interested_course" value="computer" onChange={handleChange} className='mr-2' required />
              B.E Computer
            </label>
            <label className='flex'>
              <input type="radio" name="interested_course" value="electronics" onChange={handleChange} className='mr-2' required />
              B.E Electronics
            </label>
          </div>
          {errors.interested_course && <p className='text-red-700'>{errors.interested_course}</p>}
        </div>

        <div className='space-y-8'>
          <div>
            <h1 className='text-2xl font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              IOE INFORMATION
            </h1>
            <div className='flex flex-col gap-8 mt-4 md:flex-row'>
              <div className='flex flex-col w-full md:w-1/2'>
                <label className='mb-2 text-lg font-bold'>
                  IOE ROLL.NO
                  <input
                    type='text'
                    name='ioe_roll_no'
                    value={formData.ioe_roll_no}
                    onChange={handleChange}
                    className='block w-full px-4 py-2 mt-2 border border-blue-700 rounded-lg'
                    required
                  />
                  {errors.ioe_roll_no && <p className='text-red-700'>{errors.ioe_roll_no}</p>}
                </label>
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <label className='mb-2 text-lg font-bold'>
                  IOE RANK
                  <input
                    type='text'
                    name='ioe_rank'
                    value={formData.ioe_rank}
                    onChange={handleChange}
                    className='block w-full px-4 py-2 mt-2 border border-blue-700 rounded-lg'
                    required
                  />
                  {errors.ioe_rank && <p className='text-red-700'>{errors.ioe_rank}</p>}
                </label>
              </div>
            </div>
          </div>

          <div>
            <h1 className='text-2xl font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              +2 CERTIFICATE
            </h1>
            <div className='flex flex-col gap-8 mt-4 md:flex-row'>
              <div className='flex flex-col w-full md:w-1/3'>
                <label className='mb-2 text-lg font-bold'>
                  TRANSCRIPT
                  <input
                    type='file'
                    name='transcript'
                    onChange={handleChange}
                    className='block mt-2'
                  />
                  {errors.transcript && <p className='text-red-700'>{errors.transcript}</p>}
                </label>
              </div>
              <div className='flex flex-col w-full md:w-1/3'>
                <label className='mb-2 text-lg font-bold'>
                  MIGRATION
                  <input
                    type='file'
                    name='migration'
                    onChange={handleChange}
                    className='block mt-2'
                  />
                  {errors.migration && <p className='text-red-700'>{errors.migration}</p>}
                </label>
              </div>
              <div className='flex flex-col w-full md:w-1/3'>
                <label className='mb-2 text-lg font-bold'>
                  CHARACTER
                  <input
                    type='file'
                    name='character'
                    onChange={handleChange}
                    className='block mt-2'
                  />
                  {errors.character && <p className='text-red-700'>{errors.character}</p>}
                </label>
              </div>
            </div>
          </div>

          <div>
            <h1 className='text-2xl font-bold' style={{ fontFamily: "'Merriweather', serif" }}>
              UNDERTAKING AND SIGNATURE
            </h1>
            <p className='mt-2 text-lg'>
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className='mr-2 font-semibold text-justify'
                required
              />
              I hereby declare that the particulars furnished in this application form are correct and true and I fully agree to whatever actions taken as per rules and regulations of JEC Kupondole if found false or incorrect.
              {errors.agreement && <p className='text-red-700'>{errors.agreement}</p>}
            </p>

            <p className='mt-2 text-sm text-red-600'>
              Note: Photo fields are optional. While uploading a profile photo, make sure it is less than 2 MB.
           </p>
          </div>

          <div className='flex justify-center text-xl'>
          {hasSubmitted ? (
            <div className='flex space-x-4'>
              <Link to='/viewform'>
                <button
                  type='button'
                  className='px-6 py-2 font-semibold text-white bg-blue-700 rounded-lg shadow-lg'
                >
                  Edit Form
                </button>
              </Link>
              <Link to='/formstatus'>
                <button
                  type='button'
                  className='px-6 py-2 font-semibold text-white bg-blue-700 rounded-lg shadow-lg'
                >
                  Form Status
                </button>
              </Link>
            </div>
          ) : (
            <div className='w-full'> 
            <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='items-center px-6 py-2 font-semibold text-white bg-blue-700 rounded-lg shadow-lg'
            >
              Submit
            </button>
            </div>
            <p className='mt-2 text-sm text-red-600 text-start'>
              Note: login to view and change the information.
           </p>
</div>

          )}
        </div>
        </div>
      </form>
    </div>
  );
}
