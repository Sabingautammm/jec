import React, { Component } from 'react'

export class EligibilityCri extends Component {
  render() {
    return (
      <div className="p-2">
        <h1 className="text-2xl md:text-3xl font-bold text-left text-blue-700 mb-4">
          1. Eligibility Criteria
        </h1>
        <ul className="text-lg md:text-xl font-helvari font-semibold text-gray-800">
          <li>
            Candidates must pass 10+2 with a minimum of 45% to 50% in Physics, Chemistry, and Mathematics overall.
          </li>
        </ul>
      </div>
    )
  }
}

export default EligibilityCri
