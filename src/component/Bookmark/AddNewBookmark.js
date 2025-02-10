import { useState } from "react";
import Modal from "../Modal/Modal";
import BookmarkForm from "./BookmarkForm";

const AddNewBookmark = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editBookmark, setEditBookmark] = useState(null);  Remove if not needed

  const handleOpenModal = () => {
    setIsModalOpen(true); // Toggle modal open/closed (true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>
        <button onClick={handleOpenModal}>Add New</button> 
      </div>

      {/* Conditionally render the Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <BookmarkForm  onClose={handleCloseModal}/>
        </Modal>
      )}
    </>
  );

};

export default AddNewBookmark;