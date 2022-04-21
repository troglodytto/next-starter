import { render, screen } from '@testing-library/react';
import Home from 'pages';
import '@testing-library/jest-dom';

test('renders the homepage', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Homepage/i);
  expect(linkElement).toBeInTheDocument();
});
