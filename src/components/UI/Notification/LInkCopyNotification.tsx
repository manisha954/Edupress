// Notification.tsx
import React from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const LinksNotification: React.FC<NotificationProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white">
        &times;
      </button>
    </div>
  );
};

export default LinksNotification;
