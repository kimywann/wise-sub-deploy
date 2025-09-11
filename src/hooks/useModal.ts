import { useState } from "react";

export const useModal = () => {
  const [openEditModal, setOpenEditModal] = useState<number | null>(null);

  const handleOpenEditModal = (id: number) => {
    setOpenEditModal(id);
  };

  const handleCloseModal = () => {
    setOpenEditModal(null);
  };

  return {
    openEditModal,
    handleOpenEditModal,
    handleCloseModal,
  };
};
