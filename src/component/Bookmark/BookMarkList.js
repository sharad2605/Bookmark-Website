import React from 'react';
import { BookmarkContext } from '../store/BookmarkContext';
import { useContext,useState } from 'react';
import Modal from '../Modal/Modal';
const BookmarkList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { bookmarks,deleteBookmark,updateBookmark } = useContext(BookmarkContext);
  const [bookId, setBookId ] = useState(null);
  const[bookmarkName, setBookmarkName] = useState('');
  const[bookmarkUrl, setBookmarkUrl] = useState('');
   
  
  const handleEdit = (id) => {
    setBookId(id);
    setBookmarkName(bookmarks.find((bookmark) => bookmark.id === id)?.name);
    setBookmarkUrl(bookmarks.find((bookmark) => bookmark.id === id)?.url);
    setIsModalOpen(true); 
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBookmark(bookId, { name: bookmarkName, url: bookmarkUrl });
    setIsModalOpen(false);
  };

  return(
    
    <div>
      <h2>All Bookmarks</h2>
       <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id} style={{ marginBottom: "10px" }}>
            {bookmark.name} 
            <a 
              href={bookmark.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "blue", textDecoration: "underline", marginLeft: "5px",marginRight: "5px" }}
            >
              {bookmark.url}
            </a>
              <button  onClick={() => handleEdit(bookmark.id)}>Edit</button>
            <button  onClick={() => deleteBookmark(bookmark.id)} >Delete</button>
          </li>
        ))}
      </ul> 

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit}>
            <h2>Edit Bookmark</h2>
            <input
              type="text"
              placeholder="Bookmark Name"
              value={bookmarkName}
              onChange={(e) => setBookmarkName(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="Bookmark URL"
              value={bookmarkUrl}
              onChange={(e) => setBookmarkUrl(e.target.value)}
              required
            />
            <button  type="submit">Update</button>
            <button  type="submit">Close</button>
          </form>
        </Modal>
      )}

    </div>
)
};

export default BookmarkList;