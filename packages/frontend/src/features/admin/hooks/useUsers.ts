import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
    useCreateUserMutation, 
} from '../services/adminApi';

export const useUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation(); 


  return {
    users,
    isLoading,
    deleteUser,
    updateUser,
    createUser,
  };
};
