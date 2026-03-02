import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "../UserForm";

// create simple mocks for the custom hooks
const mockAdd = { mutate: vi.fn(), status: "idle" };
const mockUpdate = { mutate: vi.fn(), status: "idle" };

vi.mock("../../hooks/useFetchUsers", () => ({
  useAddUser: () => mockAdd,
  useUpdateUser: () => mockUpdate,
}));

// helper to flush pending promises
const flushPromises = () => new Promise(setImmediate);

describe("UserForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty inputs for new user and allows typing", async () => {
    const user = userEvent.setup();
    render(<UserForm />);
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");

    await user.type(nameInput, "Charlie");
    await user.type(emailInput, "charlie@example.com");

    expect(nameInput).toHaveValue("Charlie");
    expect(emailInput).toHaveValue("charlie@example.com");
  });

  it("submits addMutation when there is no initialData", async () => {
    const user = userEvent.setup();
    render(<UserForm />);
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(nameInput, "Dave");
    await user.type(emailInput, "dave@example.com");

    fireEvent.click(button);
    expect(mockAdd.mutate).toHaveBeenCalledWith(
      { name: "Dave", email: "dave@example.com" },
      expect.any(Object),
    );
  });

  it("prefills fields when initialData provided and updates on submit", async () => {
    const initial = { id: 5, name: "Eve", email: "eve@test.com" };
    const user = userEvent.setup();
    render(<UserForm initialData={initial} />);
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const button = screen.getByRole("button", { name: /update/i });

    expect(nameInput).toHaveValue("Eve");
    expect(emailInput).toHaveValue("eve@test.com");

    await user.clear(nameInput);
    await user.type(nameInput, "Eve2");
    fireEvent.click(button);

    expect(mockUpdate.mutate).toHaveBeenCalledWith(
      { ...initial, name: "Eve2", email: "eve@test.com" },
      expect.any(Object),
    );
  });
});
