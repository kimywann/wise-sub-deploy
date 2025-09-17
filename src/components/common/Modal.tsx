import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import close from "@/assets/icon/x.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-[300px]",
    md: "w-[400px]",
    lg: "w-[600px]",
  }[size];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`mx-auto rounded-xl border border-slate-300 bg-white p-8 shadow-lg ${sizeClasses}`}
      >
        {title && (
          <header className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 hover:bg-slate-100"
            >
              <img src={close} alt="닫기" className="h-6 w-6" />
            </button>
          </header>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
