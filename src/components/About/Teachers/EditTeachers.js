import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InputField = ({ label, name, value, onChange, required }) => (
    <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={label}
            required={required}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>
);

const EditTeacher = ({ teacher, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({ ...teacher });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        setFormData({ ...teacher });
        setPhoto(null); // Reset photo when teacher changes
    }, [teacher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]); // Set the photo file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

        const trimmedData = {
            ...formData,
            name: formData.name.trim(),
            subject: formData.subject.trim(),
            faculty: formData.faculty.trim(),
        };

        const dataToSend = new FormData();
        // Append all fields to FormData
        dataToSend.append("name", trimmedData.name);
        dataToSend.append("subject", trimmedData.subject);
        dataToSend.append("faculty", trimmedData.faculty);
        // Only append photo if it exists
        if (photo) {
            dataToSend.append("photo", photo);
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.put(`https://jec.edu.np/api/teachers/${teacher.id}/`, dataToSend, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error("Error updating teacher:", error.response?.data || error.message);
            setErrorMessage("There was an error updating the teacher. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold">Edit Teacher</h2>
            {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Faculty"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleChange}
                    required
                />
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-semibold">Upload Photo (optional)</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handlePhotoChange}
                        className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className='flex justify-between'>
                    <button
                        type="submit"
                        className={`p-2 mt-2 text-white bg-blue-500 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 mt-2 text-white bg-red-500 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTeacher;
