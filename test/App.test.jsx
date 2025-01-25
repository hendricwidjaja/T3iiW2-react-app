import { test } from "vitest";
import App from "../src/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserAuthContextProvider } from "../src/contexts/UserAuthContextProvider";

// render content and check if the rendered content is as expected

test("Render the App component", () => {
  render(<App />);

  const mainPageHeader = screen.getByText("Vite + React");
  expect(mainPageHeader).toBeInTheDocument();
});

// render content and simulate interactions
test("Render the App component with a button that increases the count", async () => {
  render(<App />);

  // Find the button element on the screen
  const counterButton = screen.getByTestId("counterButton");

  // Check the button's text for "count is 0"
  expect(counterButton).toBeInTheDocument();
  expect(counterButton).toHaveTextContent("count is 0");

  // Click on the button

  // Create a user
  const user = userEvent.setup();

  // Implement click action on the button
  await user.click(counterButton);

  // Check the button's text for "count is 1"
  expect(counterButton).toHaveTextContent("count is 1");
});

test("Render the App component with token on display", async () => {
  render(
    <UserAuthContextProvider>
      <App />
    </UserAuthContextProvider>
  );

  // Fetch the heading where the JWT is to be displayed
  let tokenHeading = screen.getByTestId('jwt-header');
  expect(tokenHeading).toHaveTextContent("");

  // Find the login button
  let loginButton = screen.getByTestId('login-button');

  // Setup a user
  const user = userEvent.setup();

  // User clicks on the login button
  await user.click(loginButton);

  // Check the token heading for the JWT (need to be await so it waits for data from API)
  await waitFor(() => {
    expect(tokenHeading).not.toHaveTextContent("");
  });
});
