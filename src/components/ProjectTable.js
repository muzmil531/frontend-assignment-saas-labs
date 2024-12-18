import React, { useState } from 'react';
import './ProjectTable.css';
import Modal from './Modal';

const ProjectTable = ({ projects = [], startIndex = 0, loading = false }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="table-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="table-container">
        <div className="no-data">
          <svg className="no-data-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <p>No projects found</p>
          <span className="no-data-subtitle">Try adjusting your search or filters</span>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="project-table">
          <thead className="table-header">
            <tr>
              <th>S.No.</th>
              <th>Title</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
              <th>By</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr 
                key={startIndex + index} 
                className="table-row"
                onClick={() => handleRowClick(project)}
                style={{ cursor: 'pointer' }}
              >
                <td data-label="S.No">
                  <div className="cell-content">
                    <span className="cell-label">S.No</span>
                    <span className="cell-value">{startIndex + index + 1}</span>
                  </div>
                </td>
                <td data-label="Title">
                  <div className="cell-content">
                    <span className="cell-label">Title</span>
                    <span className="cell-value title">{project.title}</span>
                  </div>
                </td>
                <td data-label="Percentage Funded">
                  <div className="cell-content">
                    <span className="cell-label">Percentage Funded</span>
                    <span className="cell-value percentage">{project['percentage.funded']}%</span>
                  </div>
                </td>
                <td data-label="Amount Pledged">
                  <div className="cell-content">
                    <span className="cell-label">Amount Pledged</span>
                    <span className="cell-value amount">${project['amt.pledged'].toLocaleString()}</span>
                  </div>
                </td>
                <td data-label="By">
                  <div className="cell-content">
                    <span className="cell-label">By</span>
                    <span className="cell-value author">{project.by}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectTable;
