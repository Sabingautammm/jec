import React, { Component } from 'react'
import Dashboard from './Dashboard'
import ApplicationStatus from './ApplicationStatus'

export class AdminHome extends Component {
  render() {
    return (
      <div>
        <Dashboard/>
        <ApplicationStatus/>
      </div>
    )
  }
}

export default AdminHome