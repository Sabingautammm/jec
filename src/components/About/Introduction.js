import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios"; 
import { Header } from "../Navbar/Header";
import students from "../images/jec-students.jpg";
export default function Introduction() {

  const [data, setData] = useState({
    student_count: 0,
    professor_count: 0,
    principal: { description: "", photo: "" },
    chairperson: { description: "", photo: "" },
  });
  const token = localStorage.getItem("authToken");

  const [adminData, setAdminData] = useState({
    student_count: data.student_count,
    professor_count: data.professor_count,
    principal_description: data.principal.description,
    principal_photo: data.principal_photo,
    chairperson_description: data.chairperson.description,
    chairperson_photo: data.chairperson.photo,
  });
  const useAdminStatus = () => {
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
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
      }
    }, []);
  
    return isAdmin;
  };


  const [showAdminPanel, setShowAdminPanel] = useState(false);
  useEffect(() => {
    // Fetch dynamic data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jec.edu.np/api/about-us", {
          headers: { "Content-Type": "multipart/form-data" }
        });
        const apiData = response.data[0]; // Access the first object in the array
        console.log("Fetched Data:", apiData); // Log to ensure the correct data structure
  
        // Update state with API response
        setData({
          student_count: apiData.student_count,
          professor_count: apiData.professor_count,
          principal: {
            description: apiData.principal_description,
            photo: apiData.principal_photo ? `${apiData.principal_photo}` : "", // Ensure correct photo URL
          },
          chairperson: {
            description: apiData.chairperson_description,
            photo: apiData.chairperson_photo ? `${apiData.chairperson_photo}` : "", // Ensure correct photo URL
          },
        });
  
        setAdminData({
          student_count: apiData.student_count,
          professor_count: apiData.professor_count,
          principal_description: apiData.principal_description,
          principal_photo: apiData.principal_photo ? `${apiData.principal_photo}` : "", // Reset on data load
          chairperson_description: apiData.chairperson_description,
          chairperson_photo: apiData.chairperson_photo ? `${apiData.chairperson_photo}` : "", // Reset on data load
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [token]);
  


// console.log(data)

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };


  const handleAdminSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Append text fields
    formData.append("student_count", adminData.student_count);
    formData.append("professor_count", adminData.professor_count);
    formData.append("principal_description", adminData.principal_description);
    formData.append("chairperson_description", adminData.chairperson_description);
  
    // Append files (only if they have been selected)
    if (adminData.principal_photo) {
      formData.append("principal_photo", adminData.principal_photo);
    }
    if (adminData.chairperson_photo) {
      formData.append("chairperson_photo", adminData.chairperson_photo);
    }
  
    try {
      const response = await axios.post("https://jec.edu.np/api/about-us/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", // Let axios handle this automatically
        },
      });
  
      const updatedData = response.data;
  
      // Update the UI with the response data
      setData({
        student_count: updatedData.student_count,
        professor_count: updatedData.professor_count,
        principal: {
          description: updatedData.principal_description,
          photo: updatedData.principal_photo ? `${updatedData.principal_photo}` : "", // Only construct URL if photo exists
        },
        chairperson: {
          description: updatedData.chairperson_description,
          photo: updatedData.chairperson_photo ? `${updatedData.chairperson_photo}` : "", // Only construct URL if photo exists
        },
      });
      
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
  
    if (file) {
      setAdminData({
        ...adminData,
        [name]: file, // Store the file object directly
      });
    }
  };
  
  

  const toggleAdminPanel = () => {
    setShowAdminPanel((prev) => !prev);
  };
  // console.log(data.principal.photo)
 // Log the entire response
 const isAdmin = useAdminStatus();

 console.log(data)
  return (
    <>
         <div
        className="container px-4 py-8 mx-auto"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
       <div className="sm:mx-0 md:mx-6 lg:mx-16">
          <div className="my-3">
            <h1 className="text-xl font-semibold leading-relaxed text-justify text-blue-600 transition-transform transform md:text-2xl lg:text-3xl">
              We are a research institution focused on providing massive <br />
              opportunities through value education. University is one of the
              <br />
              world’s preeminent public universities.
            </h1>
          </div>
          <br />
          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <div className="w-full text-justify md:w-7/12">
              <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                Our impact on individuals, our region, and the world is profound
                whether we are launching young people into a boundless future or
                confronting the grand challenges of our time through undaunted
                research and scholarship. We turn ideas into impact and
                transform lives and our world.
                <br />
                <br />
                In a sense, University’s greatest invention may be itself an
                unusual concentration of unusual talent, forever reinventing
                itself on a mission to make a better world. That invention is
                powered by individuals: a global community of educators,
                researchers, and learners with different perspectives but a
                shared commitment to serving humanity. Come, join us on the
                journey.
              </p>
            </div>
            <div className="w-full md:w-5/12">
              <img
                src={students}
                className="rounded-lg border-2 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-auto w-full md:w-[400px] lg:w-[500px] transform hover:scale-105"
                alt="Students"
              />
            </div>
          </div>
        </div>
      
      <div className="container px-4 py-8 mx-auto" style={{ fontFamily: "'Merriweather', serif" }}>
      {isAdmin &&(
        <button
          onClick={toggleAdminPanel}
          className="px-4 py-2 mb-6 text-white transition duration-200 ease-in-out bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          {showAdminPanel ? "Hide Admin Panel" : "Show Admin Panel"}
        </button>
)}
        {showAdminPanel && (
          <div className="container p-6 mb-12 bg-white border border-gray-300 rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-blue-600">Admin Panel - Update Data</h2>
            <form onSubmit={handleAdminSubmit}>
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Number of Students</label>
                <input
                  type="number"
                  name="student_count"
                  value={adminData.student_count}
                  onChange={handleAdminInputChange}
                  className="w-full p-3 border rounded-md input-field focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Number of Professors</label>
                <input
                  type="number"
                  name="professor_count"
                  value={adminData.professor_count}
                  onChange={handleAdminInputChange}
                  className="w-full p-3 border rounded-md input-field focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Principal's Description</label>
                <textarea
                  name="principal_description"
                  value={adminData.principal_description}
                  onChange={handleAdminInputChange}
                  className="w-full p-3 border rounded-md input-field focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Principal's Photo</label>
                <input
                  type="file"
                  name="principal_photo"
                  onChange={handleFileChange}
                  className="w-full p-3 border rounded-md input-field focus:outline-none focus:ring-2 focus:ring-blue-400"
                  accept="image/*"
      
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Chairperson's Description</label>
                <textarea
                  name="chairperson_description"
                  value={adminData.chairperson_description}
                  onChange={handleAdminInputChange}
                  className="w-full p-3 border rounded-md input-field focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Chairperson's Photo</label>
                <input
                  type="file"
                  name="chairperson_photo"
                  onChange={handleFileChange}
                  className="w-full p-3 border rounded-md input-field focus:outline-none focus:ring-2 focus:ring-blue-400"
                  accept="image/*"
       
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-white transition duration-200 ease-in-out bg-green-600 rounded-lg shadow-md hover:bg-green-700"
              >
                Update Data
              </button>
            </form>
          </div>
        )}

        <div className="container mb-12">
          <div className="flex flex-col items-center justify-center text-center md:flex-row">
            <div className="p-4 md:w-1/3">
              <h1 className="text-4xl font-bold text-blue-600">
                <CountUp end={data.student_count} duration={2} />
              </h1>
              <p className="mt-2 text-lg text-gray-700">STUDENTS</p>
            </div>
            <div className="p-4 md:w-1/3">
              <h1 className="text-4xl font-bold text-blue-600">
                <CountUp end={data.professor_count} duration={2} />
              </h1>
              <p className="mt-2 text-lg text-gray-700">PROFESSORS</p>
            </div>
          </div>
        </div>

        {/* Principal Section */}
        <div className="container p-4 mx-auto">
  <div className="flex flex-col gap-12 mb-12 lg:flex-row lg:items-center">
    <div className="p-4 lg:w-1/2">
      <h1 className="mb-4 text-3xl font-bold text-blue-600">Meet Our Principal</h1>
      <p className="mb-6 text-justify text-gray-950">{data.principal.description}</p>
    </div>
    <div className="p-4 lg:w-1/2">
      <img
        src={data.principal.photo || "/path/to/fallback-image.jpg"} // Use a fallback image if no photo is provided
        alt="Principal"
        className="w-full h-auto rounded-lg shadow-md"
      />
    </div>
  </div>
</div>


        {/* Chairperson Section */}
        <div className="container p-4 mx-auto">
          <div className="flex flex-col gap-12 mb-12 lg:flex-row lg:items-center">
          <div className="p-4 lg:w-1/2">
          <img
  src={data.chairperson.photo || "/path/to/fallback-image.jpg"} // Use a fallback image if no photo is provided
  alt="Chairperson"
  className="w-full h-auto rounded-lg shadow-md"
/>
            </div>
           <div className="p-4 lg:w-1/2">
              <h1 className="mb-4 text-3xl font-bold text-blue-600">Meet Our Chairperson</h1>
              <p className="mb-6 text-justify text-gray-950">{data.chairperson.description}</p>
            </div>
        
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
