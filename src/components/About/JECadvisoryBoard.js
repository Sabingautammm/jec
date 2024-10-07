import React, { useEffect, useState, Component } from "react";
import CountUp from "react-countup";
import axios from "axios"; 
import imgadv from "../images/academic.png";

// AddMemberForm Component
const AddMemberForm = ({ formData, handleInputChange, handleFileChange, handleSubmit }) => (
  <div className="p-6 my-10 bg-white rounded-lg shadow-lg">
    <h2 className="mb-4 text-xl font-bold">Add New Member</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="img"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleInputChange}
        placeholder="Designation"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className="p-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500">
        Add Member
      </button>
    </form>
  </div>
);

// EditMemberForm Component
const EditMemberForm = ({ formData, handleInputChange, handleFileChange, handleSubmit }) => (
  <div className="p-6 my-10 bg-white rounded-lg shadow-lg">
    <h2 className="mb-4 text-xl font-bold">Edit Member</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="img"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
       
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleInputChange}
        placeholder="Designation"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className="p-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500">
        Update Member
      </button>
    </form>
  </div>
);

export class JECadvisoryBoard extends Component {
  state = {
    advisoryMemberData: [],
    formData: {
      id: '',
      img: '',
      name: '',
      designation: '',
    },
    isEditing: false,
    showForm: false,
    currentlyEditingId: null,
    loading: true, // Add loading state
    isAdmin: false, // Add isAdmin state
  };

  componentDidMount() {
    this.fetchAdvisoryMembers();
    this.checkAdminStatus(); // Check admin status when component mounts
  }

  checkAdminStatus = () => {
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
            this.setState({ isAdmin: true });
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the user data", error);
        });
    }
  };

  fetchAdvisoryMembers = () => {
    const token = localStorage.getItem("authToken");
    const headers = token
      ? { Authorization: `Token ${token}` }
      : {}; // Only add Authorization header if the token exists
  
    fetch("https://jec.edu.np/api/advisory-board", {
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const advisoryMembers = data.map((member) => ({
          id: member.id,
          img: member.photo, // Ensure this matches your backend response
          name: member.name,
          designation: member.designation,
        }));
        this.setState({ advisoryMemberData: advisoryMembers, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching advisory members:", error);
        this.setState({ loading: false }); // Set loading to false even if there's an error
      });
  };
  

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          img: file,
        },
      }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData, isEditing, currentlyEditingId } = this.state;
    const token = localStorage.getItem("authToken");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("photo", formData.img);

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing 
        ? `https://jec.edu.np/api/advisory-board/${currentlyEditingId}/` 
        : "https://jec.edu.np/api/advisory-board/";

    fetch(url, {
      method,
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.fetchAdvisoryMembers(); // Refresh the list after successful submission
        this.setState({
          formData: { id: '', img: '', name: '', designation: '' },
          isEditing: false,
          showForm: false,
        });
      })
      .catch((error) => console.error("Error adding/editing advisory member:", error));
  };

  toggleFormVisibility = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
      isEditing: false,
      formData: { id: '', img: '', name: '', designation: '' },
    }));
  };

  handleEditClick = (member) => {
    this.setState({
      isEditing: true,
      showForm: true,
      currentlyEditingId: member.id,
      formData: {
        id: member.id,
        img: '',
        name: member.name,
        designation: member.designation,
      },
    });
  };

  handleDelete = (id) => {
    const token = localStorage.getItem("authToken");
    fetch(`https://jec.edu.np/api/advisory-board/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Refresh the list after successful deletion
        this.fetchAdvisoryMembers();
      })
      .catch((error) => console.error("Error deleting advisory member:", error));
  };

  render() {
    const { advisoryMemberData, isEditing, formData, showForm, loading, isAdmin } = this.state;

    return (
      <div className="container p-4 mx-auto my-10 rounded-lg shadow-xl md:p-8 bg-gradient-to-br from-white to-gray-100">
        <h1 className="text-[50px] my-5 text-red-600 text-center font-bold transition-transform duration-500 hover:scale-105" style={{ fontFamily: "'Merriweather', serif" }}>
          Advisory Board
        </h1>

        <div className="flex flex-col items-center justify-between mt-8 mb-6 md:flex-row">
          <div className="md:w-1/2">
            <p className="text-lg leading-relaxed text-gray-800">
              The Janakpur Engineering College Advisory Board is a prestigious group of industry experts who provide valuable guidance and support to our institution. Comprised of leading professionals from a range of fields, the Advisory Board is committed to helping JEC maintain its position as the nation's premier engineering program.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-800">
              Through their expertise and insights, the Advisory Board helps JEC to develop innovative academic programs and research initiatives that meet the evolving needs of society. By working closely with the principal, faculty, and students, the Board helps to identify new opportunities and partnerships that will enable JEC to continue to provide the highest standard of education to our students.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-800">
              At JEC, we are grateful for the contributions of our Advisory Board members, who help us to achieve our mission of preparing the next generation of engineering leaders. Through their dedication and expertise, our Advisory Board members play a vital role in ensuring that JEC remains at the forefront of engineering education and research.
            </p>
          </div>
          <img
            src={imgadv}
            className="mt-6 md:mt-0 md:ml-6 h-[250px] w-full md:w-1/2 rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105 border-2 border-gray-300 hover:border-blue-500"
            alt="Advisory Board"
          />
        </div>

        <div className="flex flex-col items-center justify-between mt-8 mb-6 md:flex-row">
          <p className="mb-6 text-lg font-medium text-gray-800 md:text-xl">
            Total Members: <CountUp end={advisoryMemberData.length} />
          </p>
          {isAdmin && (
            <button onClick={this.toggleFormVisibility} className="p-3 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-500">
              {showForm ? "Cancel" : "Add New Member"}
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading advisory members...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advisoryMemberData.map((member) => (
              <div
                key={member.id}
                className="relative p-6 transition-transform duration-300 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex justify-center">
                  <img
                    src={member.img || imgadv}
                    alt={member.name}
                    className="object-cover w-40 h-40 mb-4 rounded-full shadow-lg hover:opacity-90"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-center text-gray-800 hover:text-blue-500">
                  {member.name}
                </h3>
                <p className="mb-4 text-center text-gray-600">{member.designation}</p>

                {isAdmin && (
                  <div className="flex justify-center mt-4 space-x-4">
                    <button
                      onClick={() => this.handleEditClick(member)}
                      className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-green-500 rounded-full hover:bg-green-400"
                    >
                      <i className="mr-2 fas fa-edit"></i>Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
                          this.handleDelete(member.id);
                        }
                      }}
                      className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-red-500 rounded-full hover:bg-red-400"
                    >
                      <i className="mr-2 fas fa-trash"></i>Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showForm && (
          isEditing ? (
            <EditMemberForm
              formData={formData}
              handleInputChange={this.handleInputChange}
              handleFileChange={this.handleFileChange}
              handleSubmit={this.handleSubmit}
            />
          ) : (
            <AddMemberForm
              formData={formData}
              handleInputChange={this.handleInputChange}
              handleFileChange={this.handleFileChange}
              handleSubmit={this.handleSubmit}
            />
          )
        )}
      </div>
    );
  }
}

export default JECadvisoryBoard;