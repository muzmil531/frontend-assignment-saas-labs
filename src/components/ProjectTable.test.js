import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectTable from './ProjectTable';

describe('ProjectTable Component', () => {
  const mockProjects = [
    {
      title: 'Test Project 1',
      'percentage.funded': 75,
      'amt.pledged': 1500,
      by: 'John Doe'
    },
    {
      title: 'Test Project 2',
      'percentage.funded': 100,
      'amt.pledged': 2000,
      by: 'Jane Smith'
    }
  ];

  const renderComponent = (props = {}) => {
    const defaultProps = {
      projects: mockProjects,
      startIndex: 0,
      ...props
    };
    return render(<ProjectTable {...defaultProps} />);
  };

  it('renders table with correct headers', () => {
    const { getByRole } = renderComponent();
    
    const table = getByRole('table');
    const headers = table.querySelectorAll('th');
    
    expect(headers[0]).toHaveTextContent('S.No.');
    expect(headers[1]).toHaveTextContent('Title');
    expect(headers[2]).toHaveTextContent('Percentage Funded');
    expect(headers[3]).toHaveTextContent('Amount Pledged');
    expect(headers[4]).toHaveTextContent('By');
  });

  it('renders project data correctly', () => {
    const { getByText } = renderComponent();
    
    // Check first project
    expect(getByText('Test Project 1')).toBeInTheDocument();
    expect(getByText('75%')).toBeInTheDocument();
    expect(getByText('$1,500')).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();

    // Check second project
    expect(getByText('Test Project 2')).toBeInTheDocument();
    expect(getByText('100%')).toBeInTheDocument();
    expect(getByText('$2,000')).toBeInTheDocument();
    expect(getByText('Jane Smith')).toBeInTheDocument();
  });

  it('displays correct serial numbers with startIndex', () => {
    const { getByText } = renderComponent({ startIndex: 5 });
    expect(getByText('6')).toBeInTheDocument(); // 5 + 1
    expect(getByText('7')).toBeInTheDocument(); // 5 + 2
  });

  it('handles empty projects array', () => {
    const { getByText } = renderComponent({ projects: [] });
    expect(getByText('No projects found')).toBeInTheDocument();
  });

  it('handles undefined projects prop', () => {
    const { getByText } = renderComponent({ projects: undefined });
    expect(getByText('No projects found')).toBeInTheDocument();
  });
});
