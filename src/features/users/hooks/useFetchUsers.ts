import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import type { User } from "../userSlice";
import { setUsers, addUser, updateUser, removeUser } from "../userSlice";
import * as userApi from "../userApi";

export const useFetchUsers = () => {
  const dispatch = useAppDispatch();

  const result = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: userApi.fetchUsers,
  });

  useEffect(() => {
    if (result.data) {
      dispatch(setUsers(result.data));
    }
  }, [result.data, dispatch]);

  return result;
};

// mutations
export function useAddUser() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess(newUser: User) {
      dispatch(addUser(newUser));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess(updated: User) {
      dispatch(updateUser(updated));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess(_: void, id: number) {
      dispatch(removeUser(id));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
