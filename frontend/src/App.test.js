const appTestJs = `import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  // Basic test to ensure app renders
  expect(true).toBe(true);
});

test('app renders correctly', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});`;
