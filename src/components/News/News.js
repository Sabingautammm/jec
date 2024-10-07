import React, { useState, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import NewsBody from "./NewsBody";
import EditNews from "./Editnews"; // Import the EditNews component

export default function News() {
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [newNews, setNewNews] = useState({
    photo: "",
    title: "",
    description: "",
    date: "",
    publisher: "",
    is_exclusive: false,
  });
  const [selectedNews, setSelectedNews] = useState(null); // State to track the news to edit

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("https://jec.edu.np/api/user/", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.data.is_staff) {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user data", error);
      });

    fetchNewsItems();
  }, []);

  const fetchNewsItems = () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .get("https://jec.edu.np/api/news/", config)
      .then((response) => {
        setNewsList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the news items", error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`https://jec.edu.np/api/news/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setNewsList(newsList.filter((news) => news.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the news item", error);
      });
  };

  const handleNewsFormToggle = () => {
    setShowNewsForm(!showNewsForm);
  };

  const handleEdit = (news) => {
    setSelectedNews(news); // Set the selected news to be edited
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewNews({
      ...newNews,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("photo", newNews.photo);
    formData.append("title", newNews.title);
    formData.append("description", newNews.description);
    formData.append("date", newNews.date);
    formData.append("publisher", newNews.publisher);
    formData.append("is_exclusive", newNews.is_exclusive);

    axios
      .post("https://jec.edu.np/api/news/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setNewsList([...newsList, response.data]);
        setShowNewsForm(false);
        setNewNews({
          photo: "",
          title: "",
          description: "",
          date: "",
          publisher: "",
          is_exclusive: false,
        });
      })
      .catch((error) => {
        console.error("There was an error adding the news item", error);
      });
  };

  return (
    <>
      <div className="sm:mx-[20px] md:mx-[120px] w-[94%] mx-auto">
        <div className="mt-2" style={{ fontFamily: "'Merriweather', serif", color: "#003366" }}>
          <div className="flex justify-between">
            <h1 className="text-[40px] text-red-600 transition-all duration-500 hover:text-red-800">
              News & Updates
            </h1>
            {isAdmin && (
              <button
                className="px-4 py-2 text-lg text-white bg-green-500 rounded-lg"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Done" : "Edit"}
              </button>
            )}
          </div>
          <NewsBody />
        </div>

        {editMode && isAdmin && (
          <div className="py-4 px-7">
            <button className="p-4 bg-blue-700 border rounded-lg" onClick={handleNewsFormToggle}>
              <CgMathPlus className="text-2xl font-bold text-white" />
              <p className="text-lg font-semibold text-white ">Add news and event</p>
            </button>
          </div>
        )}

        {showNewsForm && (
         <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg form-container">
         <form onSubmit={handleFormSubmit} className="space-y-6">
           <div>
             <label
               htmlFor="photo"
               className="block text-sm font-medium text-gray-700"
             >
               Photo
             </label>
             <input
               type="file"
               name="photo"
               className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               onChange={(e) =>
                 setNewNews({ ...newNews, photo: e.target.files[0] })
               }
             />
           </div>
       
           <div>
             <label
               htmlFor="title"
               className="block text-sm font-medium text-gray-700"
             >
               Title
             </label>
             <input
               type="text"
               name="title"
               value={newNews.title}
               className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               onChange={handleInputChange}
               required
             />
           </div>
       
           <div>
             <label
               htmlFor="description"
               className="block text-sm font-medium text-gray-700"
             >
               Description
             </label>
             <textarea
               name="description"
               value={newNews.description}
               className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               onChange={handleInputChange}
               required
             />
           </div>
       
           <div>
             <label
               htmlFor="date"
               className="block text-sm font-medium text-gray-700"
             >
               Date
             </label>
             <input
               type="date"
               name="date"
               value={newNews.date}
               className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               onChange={handleInputChange}
               required
             />
           </div>
       
           <div>
             <label
               htmlFor="publisher"
               className="block text-sm font-medium text-gray-700"
             >
               Publisher
             </label>
             <input
               type="text"
               name="publisher"
               value={newNews.publisher}
               className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               onChange={handleInputChange}
               required
             />
           </div>
       
           <div className="flex items-center">
             <input
               type="checkbox"
               name="is_exclusive"
               className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
               checked={newNews.is_exclusive}
               onChange={handleInputChange}
             />
             <label
               htmlFor="is_exclusive"
               className="block ml-2 text-sm text-gray-900"
             >
               Exclusive
             </label>
           </div>
       
           <button
             type="submit"
             className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           >
             Submit News
           </button>
         </form>
       </div>
       
        )}

        {selectedNews && (
          <EditNews
            news={selectedNews}
            setNewsList={setNewsList}
            setSelectedNews={setSelectedNews}
            newsList={newsList}
          />
        )}

        <div className="grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="relative col-span-1 p-5 transition-transform border border-gray-200 shadow-lg bg-gradient-to-r from-white via-gray-50 to-white rounded-2xl hover:shadow-2xl hover:scale-105"
            >
              <a href={news.photo} download className="block overflow-hidden rounded-lg">
                <img
                  src={news.photo}
                  alt="news"
                  className="object-cover w-full h-48 transition-transform duration-500 ease-in-out transform border-2 hover:scale-110"
                />
              </a>
              <h2 className="mt-4 text-xl font-bold tracking-wide text-gray-800" style={{ fontFamily: "'Merriweather', serif" }}>
                {news.title}
              </h2>
              <p className="mt-3 mb-2 leading-relaxed text-gray-700">{news.description}</p>
              <p className="mt-1 text-sm text-gray-500" style={{ fontFamily: "'Merriweather', serif" }}>
                {news.date}
              </p>
              <p className="text-sm text-gray-500" style={{ fontFamily: "'Merriweather', serif" }}>
                {news.publisher}
              </p>

              {editMode && isAdmin && (
                <div className="flex justify-between mt-5 space-x-4">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this news item?")) {
                        handleDelete(news.id);
                      }
                    }}
                    className="p-2 text-red-600 transition-all duration-300 ease-in-out bg-red-100 rounded-full hover:bg-red-200"
                    >
                      <AiFillDelete className="text-2xl" />
                    </button>
                  <button
                    onClick={() => handleEdit(news)} // Trigger edit
                   style={{ fontFamily: "'Merriweather', serif" }}
            className="flex items-center justify-center px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95"
                  >
                    Edit News
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
