import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{project.title}</h2>
        <div className="modal-body">
          <div className="modal-info-grid">
            <div className="info-item">
              <label>By</label>
              <p>{project.by}</p>
            </div>
            <div className="info-item">
              <label>Location</label>
              <p>{project.location}</p>
            </div>
            <div className="info-item">
              <label>Amount Pledged</label>
              <p>${project['amt.pledged'].toLocaleString()} {project.currency.toUpperCase()}</p>
            </div>
            <div className="info-item">
              <label>Percentage Funded</label>
              <p>{project['percentage.funded']}%</p>
            </div>
            <div className="info-item">
              <label>Number of Backers</label>
              <p>{project['num.backers']}</p>
            </div>
            <div className="info-item">
              <label>End Time</label>
              <p>{new Date(project['end.time']).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="modal-description info-item">
            <label>Description</label>
            <p>{project.blurb}</p>
          </div>
          <div className="modal-footer">
            <a href={`https://www.kickstarter.com${project.url}`} target="_blank" rel="noopener noreferrer" className="view-project-btn">
              View Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
