import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 這裡可以加入表單資料處理或發送API
    alert('Thank you for your message!');
    navigate('/'); // 導回首頁
  };

  return (
    <div>
      <h1>Contact Me</h1>
      <div className="contact-info">
        <p>Email: sarahching0111@gmail.com</p>
        <p>Phone: +852 9494 9303</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label>Contact Number</label>
        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />

        <label>Email Address</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
