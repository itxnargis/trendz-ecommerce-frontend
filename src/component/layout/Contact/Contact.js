import React, { useState } from 'react';
import "./Contact.css";
import { FaEnvelope, FaUser, FaPen, FaComments } from 'react-icons/fa';

const ContactForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { fullName, email, subject, message });
        alert('Thanks for your message! We\'ll get back to you soon.');
        setFullName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <section className="contact-container" id="contact">
            <div className="contact-heading">
                <h2>Get in Touch</h2>
                <p>I'd love to hear from you!</p>
            </div>
            <div className="container-box">
                <form onSubmit={handleSubmit} className='form'>
                    <div className="form-info">
                        <div className="contact-forms">
                            <label htmlFor="fullName">
                                <FaUser className="input-icon" />
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                className="input-width"
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-info">
                        <div className="contact-forms">
                            <label htmlFor="email">
                                <FaEnvelope className="input-icon" />
                                Email
                            </label>
                            <input
                                id="email"
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
                            <label htmlFor="subject">
                            <FaPen className="input-icon" />
                                Subject
                            </label>
                            <input
                                id="subject"
                                className="input-width"
                                type="text"
                                placeholder="Enter the subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-info">
                        <div className="contact-forms">
                            <label htmlFor="message">
                                <FaComments className="input-icon" />
                                Your Message
                            </label>
                            <textarea
                                id="message"
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

