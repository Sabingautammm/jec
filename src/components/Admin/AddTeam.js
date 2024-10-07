import React, { Component } from "react";
import axios from "axios";
import { Sidebar } from "./_component/Sidebar";

export class AddTeam extends Component {
  state = {
    formData: {
      photo: null,
      name: "",
      subject: "",
      faculty: "",
    },
    errors: {},
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: files ? files[0] : value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const token = localStorage.getItem('authToken');

    const formDataObj = new FormData();
    formDataObj.append("photo", formData.photo);
    formDataObj.append("name", formData.name);
    formDataObj.append("subject", formData.subject);
    formDataObj.append("faculty", formData.faculty);

    axios.post('https://jec.edu.np/api/teachers/', formDataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`, 
      },
    })
    .then((response) => {
      // console.log(response.data);
      alert("You have added a new teacher");
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
  }; 

  render() {
    const { formData, errors } = this.state;

    return (
      <div className="">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl md:text-xl lg:text-2xl text-red-600 font-bold text-center mb-6 transition-all duration-500 hover:text-red-800">
            Add Team
          </h1>
          <div className="max-w-lg mx-auto">
            <form onSubmit={this.handleSubmit}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col">
                  <label className="text-lg font-bold mb-2">
                    Add Photo
                    <input
                      type="file"
                      name="photo"
                      onChange={this.handleChange}
                      className="block px-4 py-2 mt-2 w-full border border-blue-600 rounded-lg"
                      required
                    />
                    {errors.photo && <p className="text-red-700">{errors.photo}</p>}
                  </label>
                  <label className="block text-lg font-bold mb-2 mt-3">
                    Teacher's Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={this.handleChange}
                      className="block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2"
                      required
                    />
                    {errors.name && <p className="text-red-700">{errors.name}</p>}
                  </label>
                  <label className="block text-lg font-bold mb-2 mt-3">
                    Subject:
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={this.handleChange}
                      className="block w-full border border-blue-700 rounded-lg px-4 py-2 mt-2"
                      required
                    />
                    {errors.subject && <p className="text-red-700">{errors.subject}</p>}
                  </label>
                  <div className="text-center mt-4">
                    <h2 className="text-2xl font-bold text-red-700">
                      Choose the Faculty
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center mt-4 gap-5">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="faculty"
                          value="BCE"
                          onChange={this.handleChange}
                          className="mr-2"
                          required
                        />
                        BCE
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="faculty"
                          value="BCT"
                          onChange={this.handleChange}
                          className="mr-2"
                          required
                        />
                        BCT
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="faculty"
                          value="BEI"
                          onChange={this.handleChange}
                          className="mr-2"
                          required
                        />
                        BEI
                      </label>
                    </div>
                    {errors.faculty && <p className="text-red-700">{errors.faculty}</p>}
                  </div>
                  <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="mt-6 w-full max-w-xs sm:w-[50%] lg:w-[25%] bg-red-600 text-white py-2 px-6 text-center rounded-lg hover:bg-red-800"
                  >
                    Submit
                  </button>
                </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTeam;
