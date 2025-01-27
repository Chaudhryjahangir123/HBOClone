/**
 * @jest-environment jsdom
 */


// Import functions to test
const { handleSubmit, validateName, validateUsername, validateEmail, validatePassword } = require('./loginfunc');

// Mock `window.location` to prevent actual redirection during testing
beforeAll(() => {
    delete global.window;
    global.window = { location: { href: "" } };
});

// Mock `window.alert` properly
beforeEach(() => {
    global.alert = jest.fn();  // Mock alert function globally
});

afterEach(() => {
    jest.restoreAllMocks();  // Clean up mocks after each test
});

describe("Validation Functions", () => {
    test("validateName should allow only alphabetic characters", () => {
        expect(validateName("John")).toBe(true);
        expect(validateName("John123")).toBe(false);
        expect(validateName("")).toBe(false);
        expect(validateName("John@")).toBe(false);
    });

    test("validateUsername should check length and spaces", () => {
        expect(validateUsername("john_doe")).toBe(true);
        expect(validateUsername("joh")).toBe(false); // Too short
        expect(validateUsername("john doe")).toBe(false); // Contains space
    });

    test("validateEmail should validate correct email format", () => {
        expect(validateEmail("test@example.com")).toBe(true);
        expect(validateEmail("invalid-email")).toBe(false);
        expect(validateEmail("test@.com")).toBe(false);
    });

    test("validatePassword should require length, number, and special character", () => {
        expect(validatePassword("Password1!")).toBe(true);
        expect(validatePassword("short1!")).toBe(false); // Too short
        expect(validatePassword("NoSpecialChar1")).toBe(false); // No special character
    });
});

describe("handleSubmit Function", () => {
    test("handleSubmit should return false for valid inputs and redirect to login.html", () => {
        // Set up your form values and mock window.location
        document.getElementById = jest.fn().mockImplementation((id) => {
            if (id === "firstname") return { value: "John" };
            if (id === "lastname") return { value: "Doe" };
            if (id === "username") return { value: "john_doe" };
            if (id === "email") return { value: "test@example.com" };
            if (id === "password") return { value: "Password1!" };
        });

        const result = handleSubmit();
        expect(result).toBe(false); // Prevent form submission
        expect(window.location.href).toBe("login.html"); // Ensure redirection
    });

    test("handleSubmit should show an alert for invalid first name", () => {
        document.getElementById = jest.fn().mockImplementation((id) => {
            if (id === "firstname") return { value: "John123" }; // Invalid first name
            if (id === "lastname") return { value: "Doe" };
            if (id === "username") return { value: "john_doe" };
            if (id === "email") return { value: "test@example.com" };
            if (id === "password") return { value: "Password1!" };
        });

        const result = handleSubmit();
        expect(global.alert).toHaveBeenCalledWith("First Name should only contain letters.");
        expect(result).toBe(false); // Ensure the form submission is prevented
    });
});
