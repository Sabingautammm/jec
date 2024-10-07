import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function Civil({ courseId }) {
  const [data, setData] = useState({
    first: { I: { subjects: [], credit_hours: 0 }, II: { subjects: [], credit_hours: 0 }},
    second: { I: { subjects: [], credit_hours: 0 }, II: { subjects: [], credit_hours: 0 }},
    third: { I: { subjects: [], credit_hours: 0 }, II: { subjects: [], credit_hours: 0 }},
    fourth: { I: { subjects: [], credit_hours: 0 }, II: { subjects: [], credit_hours: 0 }},
});



    const [formData, setFormData] = useState({
        subjects: '',
        credit_hours: 18,
        year: 'first',
        semester: 'I',
        selectedCourseId: '',
        editIndex: null,
    });

    const [courseData, setCourseData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isManagingSubjects, setIsManagingSubjects] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Fetch course details
    useEffect(() => {
      const fetchCourseDetails = async () => {
        if (!courseId) return;
        try {
            const response = await axios.get(`https://jec.edu.np/api/courses/${courseId}/`);
            setCourseData(response.data);
            const formattedData = transformApiResponse(response.data.structures);
            console.log("Formatted Data:", formattedData); // Log the formatted data
            setData(formattedData);
        } catch (error) {
            console.error("Error fetching course details:", error.response ? error.response.data : error.message);
        }
    };
    

        fetchCourseDetails();
    }, [courseId]);

    // Check if user is admin
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await axios.get("https://jec.edu.np/api/user/", {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Token ${token}`,
                        },
                    });
                    setIsAdmin(response.data.is_staff);
                } catch (error) {
                    console.error("There was an error fetching the user data", error);
                }
            }
        };

        fetchUser();
    }, []);

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://jec.edu.np/api/courses/');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);
    const transformApiResponse = (apiData) => {
      const newData = {
          first: { I: { subjects: [], credit_hours: 0 }, II: { subjects: [], credit_hours: 0 }},
          second: { I: { subjects: [], credit_hours: 0 }, II: { subjects: [], credit_hours: 0 }},
          third: { I: { subjects: [], credit_hours: 0 }, II: { subjects: [], credit_hours: 0 }},
          fourth: { I: { subjects: [], credit_hours: 0 }, II: { subjects: [], credit_hours: 0 }},
      };
  
      apiData.forEach((item) => {
          const { year, semester, subjects, credit_hours } = item;
          const subjectsArray = subjects ? subjects.split(',').map(subject => subject.trim()) : [];
  
          if (!newData[year]) newData[year] = {}; // Ensure year exists
  
          if (!newData[year][semester]) {
              newData[year][semester] = {
                  subjects: subjectsArray.map(subject => ({ name: subject, id: item.id })), 
                  credit_hours
              };
          } else {
              newData[year][semester].subjects = Array.from(new Set([...newData[year][semester].subjects, ...subjectsArray.map(subject => ({ name: subject, id: item.id }))]));
              newData[year][semester].credit_hours += credit_hours;
          }
      });
  
      return newData;
  };
  
  

  const handleAddCourse = async () => {
    const { subjects, credit_hours, selectedCourseId, year, semester } = formData;

    console.log("Selected Year:", year);
    console.log("Selected Semester:", semester);
    console.log("Data Structure:", data);
    if (!selectedCourseId) {
        alert('Please select a course first.');
        return;
    }

    if (!subjects) {
        alert('Please enter a subject name.');
        return;
    }

    // Debugging logs
    console.log("Selected Year:", year);
    console.log("Selected Semester:", semester);
    console.log("Data Structure:", data);
    console.log("Current Semester Data:", data[year][semester]); // Log current semester data

    // Check if the selected year and semester are valid
    if (!data[year] || !data[year][semester] || !data[year][semester].subjects) {
        alert('Selected year or semester is not valid.');
        return;
    }

    const subjectsArray = subjects.split(',').map(subject => subject.trim());

    // Create newSubjects array without duplicates
    const newSubjects = Array.from(new Set([
        ...data[year][semester].subjects.map(subj => subj.name), // current subjects by name
        ...subjectsArray // new subjects
    ])).map(name => {
        const existingSubject = data[year][semester].subjects.find(subj => subj.name === name);
        return {
            name,
            id: existingSubject ? existingSubject.id : Date.now() // assign a new ID if not existing
        };
    });

    const newCreditHours = data[year][semester].credit_hours + parseInt(credit_hours, 10);

    const newData = {
        ...data,
        [year]: {
            ...data[year],
            [semester]: {
                subjects: newSubjects,
                credit_hours: newCreditHours,
            },
        },
    };

    setData(newData);

    try {
        const token = localStorage.getItem('authToken');
        await axios.post(
            'https://jec.edu.np/api/structure/',
            {
                year,
                semester,
                subjects,
                credit_hours,
                course: selectedCourseId,
            },
            { headers: { Authorization: `Token ${token}` } }
        );

        // Reset form data
        setFormData({ subjects: '', credit_hours: 18, year: 'first', semester: 'I', selectedCourseId: '', editIndex: null });
    } catch (error) {
        console.error('Error adding course:', error);
    }
};


  

  const handleEditCourse = (index, year, semester) => {
    const course = data[year][semester]?.subjects[index];
    if (!course) return; // Guard clause

    setFormData({
        ...formData,
        editIndex: index,
        subjects: course.name, // Access name property
        credit_hours: data[year][semester].credit_hours,
        year,
        semester,
        selectedCourseId: course.id, // Assuming you want to keep track of the course ID
    });
    setIsEditing(true);
    setIsManagingSubjects(true);
};

const handleUpdateCourse = async () => {
  const { subjects, credit_hours, year, semester, editIndex } = formData;
  const subjectId = data[year][semester].subjects[editIndex].id; // Access the ID

  const updatedSubjects = [...data[year][semester].subjects];
  updatedSubjects[editIndex] = { name: subjects, id: subjectId }; // Update the subject with its ID

  const newData = {
      ...data,
      [year]: {
          ...data[year],
          [semester]: {
              subjects: updatedSubjects,
              credit_hours: parseInt(credit_hours, 10),
          },
      },
  };

  setData(newData);

  try {
      const token = localStorage.getItem('authToken');
      await axios.put(
          `https://jec.edu.np/api/structure/${subjectId}/`, // Use subjectId for the update
          {
              year,
              semester,
              subjects: subjects, // Send updated subject name
              credit_hours,
          },
          { headers: { Authorization: `Token ${token}` } }
      );

      // Reset form data
      setFormData({ subjects: '', credit_hours: 18, year: 'first', semester: 'I', selectedCourseId: '', editIndex: null });
      setIsEditing(false);
  } catch (error) {
      console.error('Error updating course:', error);
  }
};


const handleDeleteCourse = async (index, year, semester) => {
  const subject = data[year][semester]?.subjects[index]; // Get the subject object
  console.log('Subject being deleted:', subject); // Log the subject for debugging
  const subjectId = subject?.id; // Ensure you're getting the ID

  if (!subjectId) {
      console.error('Subject ID not found for deletion');
      return; // Early return if ID is not found
  }

  // Prepare the updated data
  const updatedSubjects = data[year][semester].subjects.filter((_, i) => i !== index);
  const updatedCreditHours = Math.max(0, (data[year][semester].credit_hours || 0) - 3); // Adjust credit hours

  const newData = {
      ...data,
      [year]: {
          ...data[year],
          [semester]: {
              subjects: updatedSubjects,
              credit_hours: updatedCreditHours,
          },
      },
  };

  setData(newData); // Update local state first

  try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://jec.edu.np/api/structure/${subjectId}/`, {
          headers: { Authorization: `Token ${token}` },
      });
  } catch (error) {
      console.error('Error deleting course:', error.response ? error.response.data : error.message);
      // Optionally revert local state change if the delete fails
      setData(data); // Revert to previous data state if necessary
  }
};



  
  
  

    return (
        <div className="container p-6 mx-auto">
            {isAdmin && (
                <button
                    onClick={() => setIsManagingSubjects(prev => !prev)}
                    className="px-10 py-2 mb-5 font-semibold text-white bg-red-500 rounded"
                >
                    {isManagingSubjects ? 'Hide Manage Courses' : 'Manage Courses'}
                </button>
            )}
            {isManagingSubjects && (
                <form onSubmit={(e) => e.preventDefault()} className="p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="mb-6 text-2xl font-bold text-center">Manage Courses</h1>

                    <div className="mb-4">
                        <label htmlFor="selectedCourseId" className="block mb-2 font-semibold">Select Course</label>
                        <select
                            id="selectedCourseId"
                            value={formData.selectedCourseId}
                            onChange={(e) => setFormData({ ...formData, selectedCourseId: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Select Course --</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                        </select>
                    </div>
<div className='flex flex-wrap md:gap-[150px] gap-5 '>
                    <select className='p-3 border-2 border-black-50 col-5 rounded-3 '
    value={formData.year}
    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
>
    <option value="first">First Year</option>
    <option value="second">Second Year</option>
    <option value="third">Third Year</option>
    <option value="fourth">Fourth Year</option>
</select>
<select className='p-3 border-2 border-black-50 col-5 rounded-3 '
    value={formData.semester}
    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
>
    <option value="I">Semester I</option>
    <option value="II">Semester II</option>
</select>
</div>

                    <div className="mb-4">
                        <label htmlFor="subjects" className="block mb-2 font-semibold">Subjects</label>
                        <input
                            type="text"
                            id="subjects"
                            value={formData.subjects}
                            onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="credit_hours" className="block mb-2 font-semibold">Credit Hours</label>
                        <input
                            type="number"
                            id="credit_hours"
                            value={formData.credit_hours}
                            onChange={(e) => setFormData({ ...formData, credit_hours: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <button
                        onClick={isEditing ? handleUpdateCourse : handleAddCourse}
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded"
                    >
                        {isEditing ? 'Update Course' : 'Add Course'}
                    </button>
                </form>
            )}

            <h1 className="mb-6 text-2xl font-bold">Course Information</h1>
            <div className="flex flex-wrap">
    {Object.entries(data).map(([year, semesters]) => (
        <div key={year} className="w-full px-4 mb-6 sm:w-1/2 lg:w-1/2">
            <h2 className="mb-4 text-xl font-semibold">{year.charAt(0).toUpperCase() + year.slice(1)} Year</h2>
            {Object.entries(semesters).map(([semester, details]) => (
                <div key={semester} className="p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md">
                    <h3 className="mb-2 text-lg font-bold">{semester} Semester</h3>
                    <ul className="divide-y divide-gray-200">
                        {details.subjects.map((subject, index) => (
                            <li key={index} className="flex items-center justify-between py-2">
                                <span className="text-gray-800">{subject.name}</span> {/* Access name property */}
                                {isAdmin && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditCourse(index, year, semester)}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="Edit Course"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCourse(index, year, semester)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete Course"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 text-gray-600">Total Credit Hours: <span className="font-bold">{details.credit_hours}</span></p>
                </div>
            ))}
        </div>
    ))}
</div>



        </div>
    );
}
