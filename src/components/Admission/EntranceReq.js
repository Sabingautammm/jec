import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class EntranceReq extends Component {
  render() {
    return (
      <div className="p-2">
        <h1 className="text-2xl md:text-3xl font-bold text-left text-blue-700 mb-4">
          2. Entrance Requirements
        </h1>
        <ul className="text-lg md:text-xl font-helvari font-semibold text-gray-800 mb-4 text-justify">
          <li>
            The undergraduate Engineering Entrance Exam is conducted each year by Tribhuvan University. To get admitted into any constituent or private engineering college affiliated with TU, you need to pass and score a minimum of 40%.
          </li>
        </ul>
        <Link to="https://entrance.ioe.edu.np/">
          <button className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold text-lg transition-colors duration-300">
            Learn More
          </button>
        </Link>
      </div>
    )
  }
}

export default EntranceReq
