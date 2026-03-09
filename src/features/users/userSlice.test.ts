import usersReducer, {
  addUser,
  removeUser,
  updateUser,
  setUsers,
} from "./userSlice";
import type { User } from "./userSlice";

describe("users slice reducers", () => {
  const initialState = { list: [] };

  it("should return the initial state when passed an empty action", () => {
    expect(usersReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should set users", () => {
    const users: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    expect(usersReducer(initialState, setUsers(users))).toEqual({
      list: users,
    });
  });

  it("should add a user", () => {
    const state = { list: [{ id: 1, name: "Alice" }] };
    const newUser: User = { id: 2, name: "Bob" };
    expect(usersReducer(state, addUser(newUser))).toEqual({
      list: [...state.list, newUser],
    });
  });

  it("should update a user when id matches", () => {
    const state = { list: [{ id: 1, name: "Alice" }] };
    const updated: User = { id: 1, name: "Alice Smith" };
    expect(usersReducer(state, updateUser(updated))).toEqual({
      list: [updated],
    });
  });

  it("should not modify list if updateUser id not found", () => {
    const state = { list: [{ id: 1, name: "Alice" }] };
    const updated: User = { id: 2, name: "Someone else" };
    expect(usersReducer(state, updateUser(updated))).toEqual(state);
  });

  it("should remove a user by id", () => {
    const state = {
      list: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    };
    expect(usersReducer(state, removeUser(1))).toEqual({
      list: [{ id: 2, name: "Bob" }],
    });
  });
});
