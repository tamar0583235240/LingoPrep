import { useState } from "react";
import { Trash2, X } from "lucide-react";
import {
  useGetSharedWithQuery,
  useAddParticipantMutation,
  useGetPreviouslySharedEmailsQuery,
  useDeleteParticipantMutation,
} from "../services/ShareApi";
import { ShareDialogProps } from "../types/ShareDialogProps";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { CardSimple } from "../../../shared/ui/card";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { Spinner } from "../../../shared/ui/Spinner";


const ShareDialog = ({ open, onClose, userId, recordingId }: ShareDialogProps) => {
  const [email, setEmail] = useState("");

  const { data: participants = [], isLoading, refetch } = useGetSharedWithQuery(
    { userId, recordingId },
    { refetchOnMountOrArgChange: true, skip: !open }
  );

  const { data: suggestions = [] } = useGetPreviouslySharedEmailsQuery(userId, {
    refetchOnMountOrArgChange: true,
    skip: !open,
  });

  const [addParticipant, { isLoading: isAdding }] = useAddParticipantMutation();
  const [deleteParticipant] = useDeleteParticipantMutation();

  const handleAdd = async () => {
    if (!email) return;
    try {
      await addParticipant({ recordingId, email, userId }).unwrap();
      setEmail("");
      refetch();
    } catch (err) {
      console.error("Error adding participant:", err);
      alert("שגיאה בהוספת משתתף. נסה שוב.");
    }
  };

  const handleDelete = async (email: string) => {
    try {
      await deleteParticipant({ recordingId, email }).unwrap();
      refetch();
    } catch (err) {
      console.error("Error deleting participant:", err);
      alert("שגיאה במחיקת משתתף. נסה שוב.");
    }
  };

  const getInitial = (name?: string) => {
    if (!name || name.length === 0) return "?";
    return name.charAt(0).toUpperCase();
  };

  const filteredSuggestions = suggestions.filter(
    (s) => s.email.toLowerCase().includes(email.toLowerCase()) && email.length > 1
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-card w-full max-w-lg space-y-4 animate-fade-in text-right">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-gray-900">שיתוף הקלטה</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X />
          </button>
        </div>

        <div className="space-y-2 relative">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="הכנס כתובת אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={handleAdd}
              variant="primary-dark"
              size="sm"
              isLoading={isAdding}
              disabled={!email}
            >
              + הוסף
            </Button>
          </div>
          {filteredSuggestions.length > 0 && (
            <ul className="absolute bg-white border border-border w-full rounded-md mt-1 z-10 max-h-40 overflow-y-auto shadow-md">
              {filteredSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-3 py-2 text-sm text-text-main hover:bg-muted cursor-pointer"
                  onClick={() => setEmail(s.email)}
                >
                  {s.name ? `${s.name} - ${s.email}` : s.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {participants.map((p, i) => (
                <CardSimple key={i} className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-3">
                    <IconWrapper size="sm" color="muted">
                      {getInitial(p.name)}
                    </IconWrapper>
                    <div>
                      <div className="text-sm font-semibold text-text-main">{p.name || "ללא שם"}</div>
                      <div className="text-xs text-text-secondary">{p.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p.email)}
                    className="text-danger hover:text-red-700 transition"
                    title="מחק"
                  >
                    <Trash2 size={18} />
                  </button>
                </CardSimple>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
