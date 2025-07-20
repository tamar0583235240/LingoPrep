export type ShareDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  recordingId: string;
};