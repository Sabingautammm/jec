import React, { Component } from "react";

export class AdmissionCri extends Component {
  render() {
    return (
      <div className="p-2">
        <h1 className="text-2xl md:text-3xl font-bold text-left text-blue-700 mb-4">
          3. Admission Requirements
        </h1>
        <div id="requirement" className="text-lg font-helvari">
          <p className="mb-4 text-gray-700">
            Admission to the JEC is based on the following:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li className="text-gray-800">
              Students must have passed their Intermediate Level examination.
            </li>
            <li className="text-gray-800">
              Students must score at least 40% in IOE Entrance Examination.
            </li>
            <li className="text-gray-800">
              Entrance Score Card <span className="text-red-600">(Color Printed or Original)</span>
            </li>
            <li className="text-gray-800">
              Mark Sheet/Transcript of +2 or equivalent <span className="text-red-600">(Copy)</span>
            </li>
            <li className="text-gray-800">
              Character Certificate of +2 or equivalent <span className="text-red-600">(Copy)</span>
            </li>
            <li className="text-gray-800">
              Mark Sheet of SEE or equivalent <span className="text-red-600">(Copy)</span>
            </li>
            <li className="text-gray-800">
              Character Certificate of SEE or equivalent <span className="text-red-600">(Copy)</span>
            </li>
            <li className="text-gray-800">
              Migration Certificate <span className="text-red-600">(Original)</span>
            </li>
            <li className="text-gray-800">
              Citizenship Certificate <span className="text-red-600">(Copy)</span>
            </li>
            <li className="text-gray-800">
              Two passport-sized photographs of the applicant
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AdmissionCri;
