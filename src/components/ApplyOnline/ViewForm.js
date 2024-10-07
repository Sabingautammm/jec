import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newDocuments, setNewDocuments] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://jec.edu.np/api/application-forms/', {
          headers: { Authorization: `Token ${token}` },
        });

        const latestForm = response.data.length > 0 ? response.data[response.data.length - 1] : {};
        setFormData(latestForm);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setNewDocuments({});
  };

  const handleSave = async () => {
    setSaving(true);
    const formDataToSend = new FormData();

    // Append user details to FormData
    for (const key in formData) {
      if (key !== 'photo' && key !== 'transcript' && key !== 'migration' && key !== 'character') {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append new files to FormData
    for (const key in newDocuments) {
      formDataToSend.append(key, newDocuments[key]);
    }

    try {
      const token = localStorage.getItem('authToken');
      const formId = formData.id; // Ensure you have the form ID to update
      const response = await axios.patch(`https://jec.edu.np/api/application-forms/${formId}/`, formDataToSend, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData(response.data);
      setIsEditing(false);
      setNewDocuments({});
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNewDocuments({
      ...newDocuments,
      [e.target.name]: e.target.files[0],
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex justify-center items-center min-h-screen p-5'>
      <div className='w-full max-w-lg sm:w-full md:max-w-2xl'>
        <div className='text-center md:text-left mb-5'>
          <h1 className='text-2xl font-serif text-blue-600'>VIEW AND EDIT APPLICATION FORM</h1>
        </div>

        <div className='relative mb-8'>
          <div className='flex flex-col gap-4'>
            <div className='space-y-2'>
              {/* Full Name */}
              <div className='text-base font-serif'>
                <strong>Full Name:</strong>
                {isEditing ? (
                  <input
                    type='text'
                    name='full_name'
                    value={formData.full_name || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  />
                ) : (
                  ` ${formData.full_name || 'N/A'}`
                )}
              </div>

              {/* Date of Birth */}
              <div className='text-base font-serif'>
                <strong>Date of Birth:</strong>
                {isEditing ? (
                  <input
                    type='date'
                    name='date_of_birth'
                    value={formData.date_of_birth || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  />
                ) : (
                  ` ${formData.date_of_birth || 'N/A'}`
                )}
              </div>

              {/* Address */}
              <div className='text-base font-serif'>
                <strong>Address:</strong>
                {isEditing ? (
                  <input
                    type='text'
                    name='address'
                    value={formData.address || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  />
                ) : (
                  ` ${formData.address || 'N/A'}`
                )}
              </div>
                {/* email */}
              <div className='text-base font-serif'>
                <strong>Email:</strong>
                {isEditing ? (
                  <input
                    type='text'
                    name='email'
                    value={formData.email || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  />
                ) : (
                  ` ${formData.email || 'N/A'}`
                )}
              </div>

              {/* phone number */}
              <div className='text-base font-serif'>
                <strong>Phone Number:</strong>
                {isEditing ? (
                  <input
                    type='text'
                    name='phone_number'
                    value={formData.phone_number || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  />
                ) : (
                  ` ${formData.phone_number || 'N/A'}`
                )}
              </div>

              {/* Gender */}
              <div className='text-base font-serif'>
                <strong>Gender:</strong>
                {isEditing ? (
                  <select
                    name='gender'
                    value={formData.gender || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  >
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                    <option value='O'>Others</option>
                  </select>
                ) : (
                  ` ${formData.gender === 'M' ? 'Male' : formData.gender === 'F' ? 'Female' : formData.gender === 'O' ? 'Others' : 'N/A'}`
                )}
              </div>

              {/* Interested Course */}
              <div className='text-base font-serif'>
                <strong>Interested Course:</strong>
                {isEditing ? (
                  <select
                    name='interested_course'
                    value={formData.interested_course || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  >
                    <option value='civil'>B.E Civil</option>
                    <option value='computer'>B.E Computer</option>
                    <option value='electronics'>B.E Electronics</option>
                  </select>
                ) : (
                  ` ${formData.interested_course === 'civil' ? 'B.E Civil' : formData.interested_course === 'computer' ? 'B.E Computer' : formData.interested_course === 'electronics' ? 'B.E Electronics' : 'N/A'}`
                )}
              </div>

              {/* IOE Entrance Symbol.No */}
              <div className='text-base font-serif'>
                <strong>IOE Entrance Symbol.No:</strong>
                {isEditing ? (
                  <input
                    type='text'
                    name='ioe_roll_no'
                    value={formData.ioe_roll_no || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  />
                ) : (
                  ` ${formData.ioe_roll_no || 'N/A'}`
                )}
              </div>

              {/* IOE Rank */}
              <div className='text-base font-serif'>
                <strong>IOE Rank:</strong>
                {isEditing ? (
                  <input
                    type='text'
                    name='ioe_rank'
                    value={formData.ioe_rank || ''}
                    onChange={handleChange}
                    className='border rounded p-1 ml-2 w-full'
                  />
                ) : (
                  ` ${formData.ioe_rank || 'N/A'}`
                )}
              </div>
            </div>

            <div className='relative mb-5'>
              {isEditing ? (
                <div className='space-y-2'>
                  <div>
                    <strong>Photo:</strong>
                    <input
                      type='file'
                      name='photo'
                      onChange={handleFileChange}
                      className='border rounded p-1 ml-2 w-full'
                    />
                  </div>
                  <div>
                    <strong>Transcript:</strong>
                    <input
                      type='file'
                      name='transcript'
                      onChange={handleFileChange}
                      className='border rounded p-1 ml-2 w-full'
                    />
                  </div>
                  <div>
                    <strong>Migration Certificate:</strong>
                    <input
                      type='file'
                      name='migration'
                      onChange={handleFileChange}
                      className='border rounded p-1 ml-2 w-full'
                    />
                  </div>
                  <div>
                    <strong>Character Certificate:</strong>
                    <input
                      type='file'
                      name='character'
                      onChange={handleFileChange}
                      className='border rounded p-1 ml-2 w-full'
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Photo:</strong>{' '}
                    <a href={formData.photo || '#'} target='_blank' rel='noopener noreferrer'>
                      View Photo
                    </a>
                  </p>
                  <p>
                    <strong>Transcript:</strong>{' '}
                    <a href={formData.transcript || '#'} target='_blank' rel='noopener noreferrer'>
                      View Transcript
                    </a>
                  </p>
                  <p>
                    <strong>Migration Certificate:</strong>{' '}
                    <a href={formData.migration || '#'} target='_blank' rel='noopener noreferrer'>
                      View Migration Certificate
                    </a>
                  </p>
                  <p>
                    <strong>Character Certificate:</strong>{' '}
                    <a href={formData.character || '#'} target='_blank' rel='noopener noreferrer'>
                      View Character Certificate
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className='flex justify-between'>
            <button onClick={handleCancel} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-lg font-semibold'>
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded  text-lg font-semibold ${saving && 'opacity-50 cursor-not-allowed'}`}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        ) : (
          <div className='my-2 flex md:justify-start md:items-start justify-center items-center '>
            <button onClick={handleEdit} className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex justify-center items-center text-lg font-semibold'>
            Edit
          </button>
          </div>
        )}

        <div className='text-lg flex justify-center items-center my-3 text-red-600 font-semibold'>
          <Link to='/formstatus'>View your form status</Link>
        </div>
      </div>
    </div>
  );
}
