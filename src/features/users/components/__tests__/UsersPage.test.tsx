import { render, screen, fireEvent } from "@testing-library/react";
import type { User } from "../../userSlice";

// mocks
const mockFetch = { isLoading: false, error: null };
vi.mock("../../hooks/useFetchUsers", () => ({
  useFetchUsers: () => mockFetch,
}));

// We also need to stub UserList and UserForm since they are untested here
vi.mock("../UserList", () => ({
  default: ({ onEdit }: { onEdit: (u: User) => void }) => (
    <div>
      {/* simple stub */}
      <button onClick={() => onEdit({ id: 1, name: "Stub" })}>edit</button>
    </div>
  ),
}));

vi.mock("../UserForm", () => ({
  default: ({ initialData, onSaved }: any) => (
    <div>
      <span>form</span>
      <button onClick={() => onSaved && onSaved()}>saved</button>
      <pre data-testid="initial">
        {initialData ? JSON.stringify(initialData) : ""}
      </pre>
    </div>
  ),
}));

import UsersPage from "../UsersPage";

describe("UsersPage", () => {
  it("renders and allows editing via stubbed components", async () => {
    render(<UsersPage />);
    expect(screen.getByText("Users")).toBeInTheDocument();

    // click edit button from our stub
    fireEvent.click(screen.getByText("edit"));
    // expect the form stub to receive initialData
    expect(screen.getByTestId("initial")).toHaveTextContent('"id":1');

    // simulate save which should clear editing
    fireEvent.click(screen.getByText("saved"));
    expect(screen.getByTestId("initial")).toHaveTextContent("");
  });
});
