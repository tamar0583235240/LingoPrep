import {
  useGetUsersQueryAdmin,
  useDeleteUserMutationAdmin,
  useUpdateUserMutationAdmin,
  useCreateUserMutationAdmin,
} from '../../../shared/api/adminApi';
export const useUsers = () => {
  const { data: users, isLoading } = useGetUsersQueryAdmin();
  const [deleteUser] = useDeleteUserMutationAdmin();
  const [updateUser] = useUpdateUserMutationAdmin();
  const [createUser] = useCreateUserMutationAdmin();
  return {
    users,
    isLoading,
    deleteUser,
    updateUser,
    createUser,
  };
};
