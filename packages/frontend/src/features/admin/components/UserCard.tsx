import React, { useState } from 'react';
import { user } from '../types/userType'; // ודא שהטיפוס נקרא `User` ולא `user`
import { Eye, EyeOffIcon, Trash2, Pencil } from 'lucide-react';

interface Props {
  user: user;
  onEdit: (user: user) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="rounded-xl p-4 flex flex-col bg-white shadow-md h-full transition duration-300 ease-in-out hover:scale-105">
      {/* סטטוס משתמש */}
      <div className="flex items-center mb-4 justify-end">
        <span
          className={`w-3.5 h-3.5 rounded-full ml-2 ${
            user.isActive ? 'bg-green-500' : 'border border-gray-400'
          }`}
          title={user.isActive ? 'פעיל' : 'לא פעיל'}
        />
        <span className="text-sm text-gray-600">
          {user.isActive ? 'פעיל' : 'לא פעיל'}
        </span>
      </div>

      {/* תוכן הכרטיס */}
      <div className="flex-grow text-center" dir="rtl">
        {user.role === 'manager' && (
          <p className="mb-1 text-sm text-gray-500">מנהל</p>
        )}

        <p className="font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-gray-700 text-sm">{user.email}</p>
        <p className="text-gray-600 text-sm">{user.phone || 'אין טלפון'}</p>

        {/* סיסמה (אם קיימת) */}
        {user.password && (
          <p className="flex items-center justify-center gap-2 mt-2">
            <span className="font-mono tracking-widest select-text">
              {showPassword ? user.password : '••••••••'}
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'הסתר סיסמה' : 'הצג סיסמה'}
              className="text-primary-dark hover:text-primary-dark/80 transition"
              type="button"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <Eye size={20} />}
            </button>
          </p>
        )}
      </div>

      {/* כפתורים */}
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => onEdit(user)}
          className="bg-primary-dark text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark/90 transition flex items-center gap-2"
          type="button"
        >
          <Pencil size={18} />
          עדכן
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-danger text-white px-5 py-2.5 rounded-lg hover:bg-danger/90 transition flex items-center gap-2"
          type="button"
        >
          <Trash2 size={18} />
          מחק
        </button>
      </div>
    </div>
  );
};

export default UserCard;
