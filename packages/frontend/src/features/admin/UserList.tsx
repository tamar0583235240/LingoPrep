import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import UserCard from './components/UserCardAdmin';
import AddUserWithSwal from './components/AddNewUserAdmin';
import { UploadUsers } from './components/UploadUsersAdmin';
import UserUpdateForm from './components/UserUpdateFormAdmin';
import { user } from './types/userType';
import {
  useGetUsersQueryAdmin,
  useDeleteUserMutationAdmin,
  useUpdateUserMutationAdmin,
  useCreateUserMutationAdmin,
} from '../../shared/api/adminApi';
import { createRoot } from 'react-dom/client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { AdminUsersTitle } from './components/AdminQuestionsTitle';

const MySwal = withReactContent(Swal);
const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useGetUsersQueryAdmin();

  useEffect(() => {
    console.log("✅ users data:", users);
    if (isError) {
      console.log("❌ שגיאה בשליפת המשתמשים:", error);
    }
  }, [users, isError, error]);

  const [deleteUser] = useDeleteUserMutationAdmin();
  const [updateUser] = useUpdateUserMutationAdmin();

  const filteredUsers = users.filter((user) => {
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    const matchName =
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    return matchName && matchStatus;
  });

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: '?אתה בטוח',
      text: '!המשתמש ימחק לצמיתות',
      icon: 'warning',
      iconColor: '#64748B',
      showCancelButton: true,
      confirmButtonText: '!כן, מחק',
      cancelButtonText: 'בטל',
      confirmButtonColor: '#00B894'
    });
    if (result.isConfirmed) {
      try {
        await deleteUser(id).unwrap();
        Swal.fire({
          title: '!נמחק',
          text: 'המשתמש נמחק בהצלחה',
          icon: 'success',
          iconColor: '#64748B',
          confirmButtonColor: '#00B894',
        });
      } catch {
        Swal.fire({
          title: 'שגיאה',
          text: 'אירעה שגיאה במחיקה',
          icon: 'error',
          iconColor: '#64748B',
          confirmButtonColor: '#64748B',
        });
      }
    }
  }

  const handleEdit = async (user: user) => {
    await MySwal.fire({
      title: 'עדכון משתמש',
      html: '<div id="swal-update-form" style="direction: rtl; text-align: right;"></div>',
      showConfirmButton: false,
      showCloseButton: true,
      width: 400,
      didOpen: () => {
        const container = document.getElementById('swal-update-form');
        if (container) {
          const root = createRoot(container);
          root.render(<UserUpdateForm user={user} onSubmit={handleUpdate} />);
        }
      },
    });
  };

  const handleUpdate = async (data: Partial<user>) => {
    if (!data.id) return;
    try {
      await updateUser({ id: data.id, data }).unwrap();
      Swal.fire({
        title: '!עודכן',
        text: 'הפרטים עודכנו בהצלחה',
        icon: 'success',
        iconColor: '#64748B',
        confirmButtonColor: '#00B894',
      });
    } catch {
      Swal.fire({
        title: 'שגיאה',
        text: 'אירעה שגיאה בעדכון',
        icon: 'error',
        iconColor: '#64748B',
        confirmButtonColor: '#E74C3C',
      });
    }
  }

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <div className="text-center mb-8"><AdminUsersTitle /></div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 rtl">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="border rounded px-3 py-2 w-40 text-right"
            dir="rtl"
          >
            <option value="all">הצג את כולם</option>
            <option value="active">משתמשים פעילים</option>
            <option value="inactive">משתמשים לא פעילים</option>
          </select>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חיפוש לפי שם"
              className="px-4 py-2 border rounded-lg w-48 text-right pl-10"
              style={{ direction: 'rtl' }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <div className="rounded p-1" style={{ backgroundColor: '#00B894' }}>
                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <UploadUsers />
          <AddUserWithSwal />
        </div>
      </div>
      {isLoading ? (
        <p className="text-center">...טוען</p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          style={{ direction: 'rtl' }}
        >
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
