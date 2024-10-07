import React, { Component } from 'react'
import ContactTop from './ContactTop'
import ContactForm from './ContactForm'

export class ContactUsPage extends Component {
  render() {
    return (
      <div>
        <ContactTop/>
        <ContactForm/>
      </div>
    )
  }
}

export default ContactUsPage