import React, { Component } from 'react'

export class WeOffer extends Component {
  render() {
    return (
      <div className="p-2">
        <h1 className="text-2xl md:text-3xl font-bold text-left text-blue-700 mb-4">
          Courses We Offer
        </h1>
        <ul className="text-lg md:text-xl font-helvari font-semibold text-gray-800 space-y-2">
          <li>1. B.E Civil</li>
          <li>2. B.E Computer</li>
          <li>3. B.E Electronics & Information Engineering</li>
        </ul>
      </div>
    )
  }
}

export default WeOffer
