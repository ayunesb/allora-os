import React from "react";
import { ModalProps } from "@/types/props";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
