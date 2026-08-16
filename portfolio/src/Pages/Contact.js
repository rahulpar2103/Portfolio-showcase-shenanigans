import React from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className='contact-container'>
      <h1 className='contact-title'>Connect with me</h1>
      <div className='wrapper'>
        <a href='https://www.linkedin.com/in/rahul-pardasani-0a6aab290/' target='_blank' rel="noopener noreferrer" className='icon linkedin'>
          <div className='tooltip'>LinkedIn</div>
          <span><FontAwesomeIcon icon={faLinkedinIn} /></span>
        </a>
        <a href='https://github.com/rahulpar2103' target='_blank' rel="noopener noreferrer" className='icon github'>
          <div className='tooltip'>GitHub</div>
          <span><FontAwesomeIcon icon={faGithub} /></span>
        </a>
        <a href='https://leetcode.com/u/rahulpar03/' target='_blank' rel="noopener noreferrer" className='icon leetcode'>
          <div className='tooltip'>LeetCode</div>
          <span><FontAwesomeIcon icon={faCode} /></span>
        </a>
      </div>
    </div>
  );
};

export default Contact;