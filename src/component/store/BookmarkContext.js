import { createContext, useState, useEffect } from "react";

export const BookmarkContext = createContext({
  bookmarks: [],
  addBookmark: () => {},
  updateBookmark: (id) => {},
  deleteBookmark: (id) => {},
});

export const BookmarkProvider = ({ children }) => {
  // Load bookmarks from localStorage or set an empty array
  const [bookmarks, setBookmarks] = useState(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  // Update localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark) => {
    const updatedBookmarks = [...bookmarks, bookmark];
    setBookmarks(updatedBookmarks);
  };

  const updateBookmark = (id, updatedBookmark) => {
    const updatedBookmarks = bookmarks.map((bookmark) =>
      bookmark.id === id ? updatedBookmark : bookmark
    );
    setBookmarks(updatedBookmarks);
  };

  const deleteBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, updateBookmark, deleteBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
