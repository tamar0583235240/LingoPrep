import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createRoot } from 'react-dom/client';
import { RiAddLine } from 'react-icons/ri';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';

import SwalTipForm from './SwalTipForm';
import SwalPracticeForm from './SwalPracticeForm';

import {
  useGetAllTipsQuery,
  useAddTipMutation,
  useUpdateTipMutation,
  useDeleteTipByIdMutation,
  useGetAllPracticesQuery,
  useAddPracticeMutation,
  useUpdatePracticeMutation,
  useDeletePracticeByIdMutation,
} from '../services/TipsAndPracticesAdminApi';

const MySwal = withReactContent(Swal);

const AdminTipsAndPractices: React.FC = () => {
  const [searchTips, setSearchTips] = useState('');
  const [searchPractices, setSearchPractices] = useState('');

  const { data: tips = [], isLoading: tipsLoading, isError: tipsError } = useGetAllTipsQuery();
  const { data: practices = [], isLoading: practicesLoading, isError: practicesError } = useGetAllPracticesQuery();

  const [addTip] = useAddTipMutation();
  const [updateTip] = useUpdateTipMutation();
  const [deleteTip] = useDeleteTipByIdMutation();

  const [addPractice] = useAddPracticeMutation();
  const [updatePractice] = useUpdatePracticeMutation();
  const [deletePractice] = useDeletePracticeByIdMutation();

  const filteredTips = tips.filter(tip => tip.content.includes(searchTips));
  const filteredPractices = practices.filter(practice => practice.content.includes(searchPractices));

  const openSwalForm = (
    title: string,
    defaultValue: string,
    onSubmit: (content: string) => Promise<void>,
    FormComponent: React.FC<{ defaultValue?: string; onSubmit: (content: string) => void }>
  ) => {
    MySwal.fire({
      title,
      html: '<div id="swal-form"></div>',
      didOpen: () => {
        const container = document.getElementById('swal-form');
        if (container) {
          const root = createRoot(container);
          root.render(
            <FormComponent
              defaultValue={defaultValue}
              onSubmit={async (content) => {
                await onSubmit(content);
                MySwal.close();
              }}
            />
          );
        }
      },
      showConfirmButton: false,
      showCloseButton: true,
      width: 400,
    });
  };

  const handleAddTip = () => {
    openSwalForm('הוספת טיפ', '', async (content) => {
      await addTip({ id: Math.random().toString(36).substr(2, 9), content, created_at: new Date().toISOString() }).unwrap();
    }, SwalTipForm);
  };

  const handleEditTip = (tip: { id: string; content: string }) => {
    openSwalForm('עריכת טיפ', tip.content, async (content) => {
      await updateTip({ ...tip, content }).unwrap();
    }, SwalTipForm);
  };

  const handleDeleteTip = async (id: string, content: string) => {
    const result = await Swal.fire({
      title: 'מחיקת טיפ',
      text: `האם אתה בטוח שברצונך למחוק את הטיפ: "${content}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'מחק',
      cancelButtonText: 'בטל',
    });
    if (result.isConfirmed) {
      await deleteTip(id).unwrap();
      Swal.fire('נמחק', `הטיפ "${content}" נמחק בהצלחה`, 'success');
    }
  };

  const handleAddPractice = () => {
    openSwalForm('הוספת שאלה לתרגול', '', async (content) => {
      await addPractice({ id: Math.random().toString(36).substr(2, 9), content, created_at: new Date().toISOString() }).unwrap();
    }, SwalPracticeForm);
  };

  const handleEditPractice = (practice: { id: string; content: string }) => {
    openSwalForm('עריכת שאלה לתרגול', practice.content, async (content) => {
      await updatePractice({ ...practice, content }).unwrap();
    }, SwalPracticeForm);
  };

  const handleDeletePractice = async (id: string, content: string) => {
    const result = await Swal.fire({
      title: 'מחיקת שאלה לתרגול',
      text: `האם אתה בטוח שברצונך למחוק את השאלה: "${content}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'מחק',
      cancelButtonText: 'בטל',
    });
    if (result.isConfirmed) {
      await deletePractice(id).unwrap();
      Swal.fire('נמחק', `השאלה "${content}" נמחקה בהצלחה`, 'success');
    }
  };

  if (tipsLoading || practicesLoading) return <p>טוען נתונים...</p>;
  if (tipsError || practicesError) return <p>אירעה שגיאה בטעינת הנתונים</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans" dir="rtl">
      <h1 className="text-center text-3xl font-bold mb-6">ניהול טיפים ושאלות לתרגול</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <section className="w-full lg:w-1/2 bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">שאלות לתרגול</h2>
            <button
              className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={handleAddPractice}
            >
              <RiAddLine /> הוסף שאלה
            </button>
          </div>
          <div className="flex mb-4 items-center gap-2 border border-[#10b981] rounded-xl px-3 py-2">
            <div className="bg-[#10b981] text-white p-2 rounded-md">
              <IoSearchOutline />
            </div>
            <input
              type="text"
              placeholder="חיפוש שאלות..."
              className="flex-grow outline-none bg-transparent"
              value={searchPractices}
              onChange={(e) => setSearchPractices(e.target.value)}
            />
          </div>
          <ul>
            {filteredPractices.length === 0 && <li>לא נמצאו שאלות.</li>}
            {filteredPractices.map((practice) => (
              <li key={practice.id} className="mb-3 p-4 bg-green-50 rounded-2xl shadow flex flex-col">
                <span className="mb-2">📌 {practice.content}</span>
                <div className="flex gap-2 self-end mt-2">
                  <button
                    className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                    onClick={() => handleEditPractice(practice)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDeletePractice(practice.id, practice.content)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full lg:w-1/2 bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">טיפים</h2>
            <button
              className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={handleAddTip}
            >
              <RiAddLine /> הוסף טיפ
            </button>
          </div>
          <div className="flex mb-4 items-center gap-2 border border-[#10b981] rounded-xl px-3 py-2">
            <div className="bg-[#10b981] text-white p-2 rounded-md">
              <IoSearchOutline />
            </div>
            <input
              type="text"
              placeholder="חיפוש טיפים..."
              className="flex-grow outline-none bg-transparent"
              value={searchTips}
              onChange={(e) => setSearchTips(e.target.value)}
            />
          </div>

          <ul>
            {filteredTips.length === 0 && <li>לא נמצאו טיפים.</li>}
            {filteredTips.map((tip) => (
              <li key={tip.id} className="mb-3 p-4 bg-pink-50 rounded-2xl shadow flex flex-col">
                <span className="mb-2">💡 {tip.content}</span>
                <div className="flex gap-2 self-end mt-2">
                  <button
                    className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                    onClick={() => handleEditTip(tip)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDeleteTip(tip.id, tip.content)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminTipsAndPractices;
