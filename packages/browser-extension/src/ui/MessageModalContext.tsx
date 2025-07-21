import React, { createContext, useContext, useState, ReactNode } from 'react';
import MessageModal from './messageModal' // הנתיב לקומפוננטה MessageModal שלך

interface MessageModalContextType {
  showMessage: (title: string, message: string) => void;
  hideMessage: () => void;
}

const MessageModalContext = createContext<MessageModalContextType | undefined>(undefined);

interface MessageModalProviderProps {
  children: ReactNode;
}

export const MessageModalProvider = ({ children }: MessageModalProviderProps) => {
  const [modalState, setModalState] = useState<{
    isVisible: boolean;
    title: string;
    message: string;
  }>({
    isVisible: false,
    title: '',
    message: '',
  });

  const showMessage = (title: string, message: string) => {
    setModalState({ isVisible: true, title, message });
  };

  const hideMessage = () => {
    setModalState({ isVisible: false, title: '', message: '' });
  };

  return (
    <MessageModalContext.Provider value={{ showMessage, hideMessage }}>
      {children}
      {modalState.isVisible && (
        <MessageModal
          title={modalState.title}
          message={modalState.message}
          onClose={hideMessage}
        />
      )}
    </MessageModalContext.Provider>
  );
};

export const useMessageModal = () => {
  const context = useContext(MessageModalContext);
  if (context === undefined) {
    throw new Error('useMessageModal must be used within a MessageModalProvider');
  }
  return context;
};