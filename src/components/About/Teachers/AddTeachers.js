import React, { Component } from "react";
import axios from "axios";

export class AddTeachers extends Component {
  state = {
    formData: {
      photo: null,
      name: "",
      subject: "",
      faculty: "",
    },
    errors: {},
    successMessage: "",
    errorMessage: "",
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: files ? files[0] : value,
      },
      successMessage: "",
      errorMessage: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const token = localStorage.getItem("authToken");

    // Validate file type and size (example: limit to 5MB and image types)
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (formData.photo && !validImageTypes.includes(formData.photo.type)) {
      this.setState({ errorMessage: "Please upload a valid image file (JPEG, PNG, GIF)." });
      return;
    }

    if (formData.photo && formData.photo.size > 5 * 1024 * 1024) { // 5MB limit
      this.setState({ errorMessage: "File size should not exceed 5MB." });
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("photo", formData.photo);
    formDataObj.append("name", formData.name);
    formDataObj.append("subject", formData.subject);
    formDataObj.append("faculty", formData.faculty);

    axios
      .post("https://jec.edu.np/api/teachers/", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        this.setState({
          successMessage: "You have added a new teacher successfully!",
          errorMessage: "",
          formData: {
            photo: null,
            name: "",
            subject: "",
            faculty: "",
          },
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errorMessage: "There was an error adding the teacher. Please try again." });
      });
  };

  render() {
    const { formData, errors, successMessage, errorMessage } = this.state;

    return (
      <div className="flex-1 p-6">
        <h1 className="mb-6 text-3xl font-bold text-center text-red-600 transition-all duration-500 md:text-xl lg:text-2xl hover:text-red-800">
          Add Team
        </h1>
        <div className="max-w-lg mx-auto">
          <form onSubmit={this.handleSubmit}>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col">
                <label className="mb-2 text-lg font-bold">
                  Add Photo
                  <input
                    type="file"
                    name="photo"
                    onChange={this.handleChange}
                    className="block w-full px-4 py-2 mt-2 border border-blue-600 rounded-lg"
                    required
                  />
                  {errors.photo && <p className="text-red-700">{errors.photo}</p>}
                  {formData.photo && (
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Preview"
                      className="object-cover h-32 mt-2 rounded"
                    />
                  )}
                </label>
                <label className="block mt-3 mb-2 text-lg font-bold">
                  Teacher's Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={this.handleChange}
                    className="block w-full px-4 py-2 mt-2 border border-blue-700 rounded-lg"
                    required
                  />
                  {errors.name && <p className="text-red-700">{errors.name}</p>}
                </label>
                <label className="block mt-3 mb-2 text-lg font-bold">
                  Subject:
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={this.handleChange}
                    className="block w-full px-4 py-2 mt-2 border border-blue-700 rounded-lg"
                    required
                  />
                  {errors.subject && <p className="text-red-700">{errors.subject}</p>}
                </label>
                <div className="mt-4 text-center">
                  <h2 className="text-2xl font-bold text-red-700">
                    Choose the Faculty
                  </h2>
                  <div className="flex flex-col items-center justify-center gap-5 mt-4 md:flex-row">
                    {["BCE", "BCT", "BEI"].map((faculty) => (
                      <label key={faculty} className="flex items-center">
                        <input
                          type="radio"
                          name="faculty"
                          value={faculty}
                          onChange={this.handleChange}
                          className="mr-2"
                          required
                        />
                        {faculty}
                      </label>
                    ))}
                  </div>
                  {errors.faculty && <p className="text-red-700">{errors.faculty}</p>}
                </div>
                {successMessage && <p className="mt-4 text-green-700">{successMessage}</p>}
                {errorMessage && <p className="mt-4 text-red-700">{errorMessage}</p>}
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
    );
  }
}

export default AddTeachers;
