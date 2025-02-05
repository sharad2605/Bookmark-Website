import React, { useState, createContext, useContext, useEffect } from 'react';
import './App.css';
import Modal from './component/Modal/Modal';
// import { v4 as uuidv4 } from 'uuid';

export const BookmarkContext = createContext({
  bookmarks: [],
  addBookmark: () => {},
  updateBookmark: () => {},
  deleteBookmark: () => {},
  openModalForEdit: () => {},
});

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBookmark, setEditBookmark] = useState(null);

  // Load from localStorage, providing a default empty array if nothing is there
  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    setBookmarks(storedBookmarks ? JSON.parse(storedBookmarks) : []);
  }, []);

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);


  const addBookmark = (newBookmark) => {
    setBookmarks([...bookmarks, newBookmark]);
  };

  const updateBookmark = (updatedBookmark) => {
    setBookmarks(
      bookmarks.map((bookmark) =>
        bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
      )
    );
  };

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const openModalForEdit = (bookmark) => {
    setEditBookmark(bookmark);
    setIsModalOpen(true);
  };

  const contextValue = {
    bookmarks,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    openModalForEdit,
  };

  return (
    <BookmarkContext.Provider value={contextValue}>
      <div>
        <h1>Bookmark Website</h1>
        <button onClick={() => {
          setIsModalOpen(true);
          setEditBookmark(null);
        }}>Add New</button>

        <BookmarkList />

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            bookmark={editBookmark}
          >
            <h2>{editBookmark ? 'Edit Bookmark' : 'Add New Bookmark'}</h2>
            <input type="text" id="bookmarkName" placeholder="Bookmark Name" defaultValue={editBookmark ? editBookmark.name : ''} />
            <input type="url" id="bookmarkUrl" placeholder="Bookmark URL" defaultValue={editBookmark ? editBookmark.url : ''} />
            <button onClick={() => setIsModalOpen(false)}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </Modal>
        )}
      </div>
    </BookmarkContext.Provider>
  );
}

const BookmarkList = () => {
  const { bookmarks, deleteBookmark, openModalForEdit } = useContext(BookmarkContext);

  return (
    <div>
      <h2>All Bookmarks</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            {bookmark.name} ({bookmark.url})
            <button onClick={() => openModalForEdit(bookmark)}>Edit</button>
            <button onClick={() => deleteBookmark(bookmark.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;