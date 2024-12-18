import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    projectsPerPage: 5,
    totalProjects: 25,
    paginate: jest.fn(),
    currentPage: 1
  };

  const renderComponent = (props = {}) => {
    return render(<Pagination {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination numbers correctly', () => {
    const { getByText } = renderComponent();
    
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    const { getByText } = renderComponent();
    const currentPageButton = getByText('1').closest('button');
    expect(currentPageButton).toHaveClass('active');
  });

  it('calls paginate when clicking page number', () => {
    const { getByText } = renderComponent();
    const pageButton = getByText('2');
    fireEvent.click(pageButton);
    expect(defaultProps.paginate).toHaveBeenCalledWith(2);
  });

  it('handles previous button click', () => {
    const { getByLabelText } = renderComponent({ currentPage: 2 });
    const prevButton = getByLabelText('Previous page');
    fireEvent.click(prevButton);
    expect(defaultProps.paginate).toHaveBeenCalledWith(1);
  });

  it('handles next button click', () => {
    const { getByLabelText } = renderComponent();
    const nextButton = getByLabelText('Next page');
    fireEvent.click(nextButton);
    expect(defaultProps.paginate).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    const { getByLabelText } = renderComponent();
    const prevButton = getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const { getByLabelText } = renderComponent({ currentPage: 5 });
    const nextButton = getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });
});
