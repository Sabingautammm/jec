import React, { useState } from "react";
import axios from "axios";

export default function EditNews({ news, setNewsList, setSelectedNews, newsList }) {
  const [editedNews, setEditedNews] = useState(news);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setEditedNews({ ...editedNews, [name]: files[0] });
    } else {
      setEditedNews({ ...editedNews, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    
    const formData = new FormData();
    if (editedNews.photo instanceof File) {
      formData.append('photo', editedNews.photo);
    }
    formData.append('title', editedNews.title);
    formData.append('description', editedNews.description);
    formData.append('date', editedNews.date);
    formData.append('publisher', editedNews.publisher);
    formData.append('is_exclusive', editedNews.is_exclusive);

    axios.put(`https://jec.edu.np/api/news/${news.id}/`, formData, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      const updatedNewsList = newsList.map(item => item.id === response.data.id ? response.data : item);
      setNewsList(updatedNewsList);
      setSelectedNews(null);
    })
    .catch(error => {
      console.error("Error updating the news item", error);
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleFormSubmit} className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mb-[30px]">
            <div className="relative max-w-sm p-6 mx-auto rounded-lg shadow-lg card">
              <h2 className="mt-4 text-xl font-bold text-gray-800" style={{ fontFamily: "'Merriweather', serif" }}>
                Edit News
              </h2>
              <div className="mt-4">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  value={editedNews.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  value={editedNews.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  value={editedNews.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
                  Publisher
                </label>
                <input
                  type="text"
                  name="publisher"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                  value={editedNews.publisher}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="is_exclusive" className="block text-sm font-medium text-gray-700">
                  Exclusive
                </label>
                <input
                  type="checkbox"
                  name="is_exclusive"
                  className="block mt-1"
                  checked={editedNews.is_exclusive}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
                >
                  Update News
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
