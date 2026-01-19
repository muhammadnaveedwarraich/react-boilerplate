import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CloseSvg } from "../assets/svgs";

const Modal = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  backgroundColor,
}) => {
  const modalRef = useRef();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Close only if clicking outside the modal content
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  const modalClasses =
    `rounded-xl shadow-xl w-full lg:w-1/2 max-h-[90vh] overflow-y-auto p-6 relative ` +
    (backgroundColor ? backgroundColor : "bg-gray");
  return ReactDOM.createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent  backdrop-blur-sm"
    >
      <div ref={modalRef} className={modalClasses}>
        {showCloseButton && (
          <button
            className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl cursor-pointer"
            onClick={onClose}
          >
            <CloseSvg />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
