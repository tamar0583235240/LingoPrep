import { useDynamicContents } from '../../dynamicContent/hooks/useDynamicContents';
import { Heading1 } from '../../../shared/ui/typography';

export const AdminUsersTitle: React.FC = () => {
  const { contents, loading, error } = useDynamicContents();

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">טוען כותרת...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const titleItem = contents.find(item => item.key_name === "admin_users_title");

  return (
    <Heading1 className="text-[--color-text] mb-2">
      {titleItem ? titleItem.content : "ניהול משתמשים"}
    </Heading1>
  );
};
