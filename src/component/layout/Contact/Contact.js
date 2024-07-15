import React, { useState } from 'react';
import "./Contact.css";
import { FaEnvelope } from 'react-icons/fa';

const ContactForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { fullName, email, subject, message });
        setFullName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <section className="contactContainer" id="contact">
            <div className="contact-heading">
                <h2>Contact Me</h2>
            </div>
            <div className="container-box">
                <form onSubmit={handleSubmit}>
                    <div className="form-info">
                        <div className="contact-forms">
                            <label>Full Name</label>
                            <input
                                className="input-width"
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-info display">
                        <div className="contact-forms">
                            <label>Email</label>
                            <input
                                className="input-width"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-info">
                        <div className="contact-forms">
                            <label>Subject</label>
                            <input
                                type="text"
                                placeholder="Enter the subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-info">
                        <div className="contact-forms">
                            <label>Your Message</label>
                            <textarea
                                name="message"
                                cols="30"
                                rows="10"
                                placeholder="Feel free to leave me a message regarding my portfolio or any inquiries. I'd love to hear from you!"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <button className="contact-button" type="submit">
                        <FaEnvelope className="icon" /> Send Now
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
