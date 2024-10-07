import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from './_component/Sidebar';

const ApplicationStatus = () => {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [courseFilter, setCourseFilter] = useState(''); // New state for filtering by interested course
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('https://jec.edu.np/api/application-forms/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        setForms(response.data);
        setFilteredForms(response.data); // Initially show all forms
      })
      .catch(error => {
        console.error('Error fetching forms:', error);
      });
  }, [navigate]);

  useEffect(() => {
    // Filter forms based on courseFilter
    if (courseFilter) {
      setFilteredForms(forms.filter(form => form.interested_course && form.interested_course.toLowerCase().includes(courseFilter.toLowerCase())));
    } else {
      setFilteredForms(forms); // Show all forms if no filter
    }
  }, [courseFilter, forms]);

  const handleAccept = (formId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.patch(`https://jec.edu.np/api/application-forms/${formId}/`,
      { action: 'accepted' },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then(() => {
      setForms(forms.map(form => form.id === formId ? { ...form, action: 'accepted' } : form));
      window.location.reload();
      setCourseFilter(''); // Reset filter to show all forms after updating
    })
    .catch(error => {
      console.error('Error accepting form:', error);
    });
  };

  const handleDecline = (formId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.patch(`https://jec.edu.np/api/application-forms/${formId}/`,
      { action: 'rejected' },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then(() => {
      setForms(forms.map(form => form.id === formId ? { ...form, action: 'rejected' } : form));
      window.location.reload();
      setCourseFilter(''); // Reset filter to show all forms after updating
    })
    .catch(error => {
      console.error('Error declining form:', error);
    });
  };

  const viewDetail = (formId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    navigate('/printForm', {
      state: {
        formId,
        token,
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 overflow-x-auto ml-1 md:ml-[20%]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-2xl font-bold mb-4">Applications</h2>
          {/* Filter input */}
          <input
            type="text"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            placeholder="Filter by Interested Course"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-md shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">Form ID</th>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">IOE Symbol No.</th>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">IOE Rank</th>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">Name</th>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">Gender</th>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">DOB</th>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">Interested Programs</th>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">View Detail</th>
                  <th className="px-2 py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">Confirmation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredForms.map(form => (
                  <tr key={form.id}>
                    <td className="border px-2 py-2 text-xs sm:text-sm text-black">{form.id}</td>
                    <td className="border px-2 py-2 text-xs sm:text-sm text-black">{form.ioe_roll_no || 'N/A'}</td>
                    <td className="border px-2 py-2 text-xs sm:text-sm text-black">{form.ioe_rank || 'N/A'}</td>
                    <td className="border px-2 py-2 text-xs sm:text-sm text-black">{form.full_name || 'N/A'}</td>
                    <td className="border px-2 py-2 text-xs sm:text-sm text-black">{form.gender || 'N/A'}</td>
                    <td className="border px-2 py-2 text-xs sm:text-sm text-black">{form.date_of_birth || 'N/A'}</td>
                    <td className="border px-2 py-2 text-xs sm:text-sm text-black">{form.interested_course || 'N/A'}</td>
                    <td className="border px-2 py-2 text-xs sm:text-sm text-black">
                      <button
                        onClick={() => viewDetail(form.id)}
                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                      >
                        View Detail
                      </button>
                    </td>
                    <td className="border px-2 py-2 text-xs sm:text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAccept(form.id)}
                          className={`bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm ${form.status === 'accepted' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                          disabled={form.status === 'accepted'}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(form.id)}
                          className={`bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm ${form.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                          disabled={form.status === 'rejected'}
                        >
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
