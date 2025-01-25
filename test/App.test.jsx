import { test } from "vitest"
import App from "../src/App"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

// render content and check if the rendered content is as expected

test("Render the App component", () => {
    render(<App />)

    const mainPageHeader = screen.getByText("Vite + React")
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
    expect(counterButton).toHaveTextContent("count is 1")
})