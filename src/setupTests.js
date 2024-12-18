// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure React Testing Library
configure({
  asyncUtilTimeout: 1000,
  testIdAttribute: 'data-testid',
});

// Suppress React 18 Testing Library warnings
const originalError = console.error;
console.error = (...args) => {
  if (/Warning: ReactDOM.render is no longer supported in React 18/.test(args[0])) {
    return;
  }
  if (/Warning: `ReactDOMTestUtils.act` is deprecated/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
