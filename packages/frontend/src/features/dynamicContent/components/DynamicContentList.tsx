import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDynamicContents } from '../hooks/useDynamicContents';
import { Button } from '../../../shared/ui/button';
import { GridContainer } from '../../../shared/ui/GridContainer';

export const DynamicContentList = () => {
  const { contents, loading, error, updateContentById } = useDynamicContents();
  const [editContent, setEditContent] = useState<{ [key: number]: string }>({});

  if (loading) return <div>טוען...</div>;
  if (error) return <div>{error}</div>;

  const handleUpdate = async (id: number) => {
    if (editContent[id] !== undefined) {
      const result = await Swal.fire({
        title: 'האם אתה בטוח?',
        text: 'האם לעדכן את התוכן הנבחר?',
        icon: 'warning',
        showCancelButton: true,
        iconColor: '#64748B',
        confirmButtonColor: '#00B894',
        cancelButtonColor: '#64748B',
        confirmButtonText: 'כן, עדכן',
        cancelButtonText: 'בטל',
      });
      if (result.isConfirmed) {
        try {
          await updateContentById(id, editContent[id]);
          Swal.fire({
            title: 'עודכן!',
            text: 'התוכן עודכן בהצלחה.',
            icon: 'success',
            iconColor: '#64748B',
            confirmButtonColor: '#00B894',
            confirmButtonText: 'סגור',
          });
        } catch (err) {
          Swal.fire({
            title: 'שגיאה!',
            text: 'אירעה שגיאה בעדכון. נסה שוב.',
            icon: 'error',
            confirmButtonText: 'סגור',
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background]" dir="rtl">
      <GridContainer className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">ניהול תכנים דינמיים</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50 text-[--color-text]">
                <th className="px-4 py-2 border-b">מזהה</th>
                <th className="px-4 py-2 border-b">מפתח</th>
                <th className="px-4 py-2 border-b">תיאור</th>
                <th className="px-4 py-2 border-b">תוכן</th>
                <th className="px-4 py-2 border-b">פעולה</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((item) => (
                <tr key={item.id} className="text-center hover:bg-muted/20">
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.key_name}</td>
                  <td className="px-4 py-2 border-b">{item.description}</td>
                  <td className="px-4 py-2 border-b">
                    <textarea
                      value={editContent[item.id] ?? item.content}
                      onChange={(e) =>
                        setEditContent({ ...editContent, [item.id]: e.target.value })
                      }
                      rows={2}
                      className="w-full border border-border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <Button
                      variant="primary-dark"
                      size="sm"
                      onClick={() => handleUpdate(item.id)}
                    >
                      עדכן
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GridContainer>
    </div>
  );
};
