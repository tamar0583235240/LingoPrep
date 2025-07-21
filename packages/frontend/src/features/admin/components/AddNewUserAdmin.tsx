import React from 'react';
import withReactContent from 'sweetalert2-react-content';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../store/store.admin';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import SwalForm from './SwalFormAdmin';
const MySwal = withReactContent(Swal);
const AddUserWithSwal: React.FC = () => {
  const handleAddUserClick = () => {
    MySwal.fire({
      title: 'הוספת משתמש חדש',
      html: '<div id="swal-form"></div>',
      width: 400,
      didOpen: () => {
        const container = document.getElementById('swal-form');
        if (container) {
          const root = createRoot(container);
          root.render(
            <Provider store={store}>
              <SwalForm />
            </Provider>
          );
        }
      },
      showConfirmButton: false,
      showCloseButton: true,
    });
  };
  return (
    <button
      onClick={handleAddUserClick}
      className="bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition hover:bg-primary-dark/90 flex items-center gap-2 group"
    >
      <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
      הוספת משתמש
    </button>
  );
};
export default AddUserWithSwal;