import { useState } from "react";
import { useContext } from "react";
import { BookmarkContext } from "../store/BookmarkContext";

const BookmarkForm = ({ onClose }) => {
   const { addBookmark } = useContext(BookmarkContext); 
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkUrl, setBookmarkUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Bookmark Saved:", { bookmarkName, bookmarkUrl });
    addBookmark({ id:Math.random().toString(), name: bookmarkName, url: bookmarkUrl });

    

    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Bookmark</h2>
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
      <button type="submit">Save</button> {/* Now properly handles submission */}
      <button type="button" onClick={onClose}>Close</button> {/* Closes modal */}
    </form>
  );
};

export default BookmarkForm;
