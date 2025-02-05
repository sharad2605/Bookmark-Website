import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { v4 as uuidv4 } from 'uuid';
import { BookmarkContext } from '../../App'; // Import the context



const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />; // Close on backdrop click
};

const ModalOverlay = (props) => {
  const { addBookmark, updateBookmark } = useContext(BookmarkContext);
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkUrl, setBookmarkUrl] = useState('');

  useEffect(() => {
    // Pre-fill form if editing
    if (props.bookmark) {
      setBookmarkName(props.bookmark.name);
      setBookmarkUrl(props.bookmark.url);
    } else {
      setBookmarkName(''); // Clear for adding new
      setBookmarkUrl('');
    }
  }, [props.bookmark]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newBookmark = {
      id: props.bookmark ? props.bookmark.id : uuidv4(), // Use existing ID or generate new
      name: bookmarkName,
      url: bookmarkUrl,
    };

    if (props.bookmark) {
      updateBookmark(newBookmark);
    } else {
      addBookmark(newBookmark);
    }

    props.onClose(); // Close the modal after submit
  };

  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <h2>{props.bookmark ? 'Edit Bookmark' : 'Add New Bookmark'}</h2>
        <form onSubmit={handleSubmit}> {/* Use a form for submission */}
          <input
            type="text"
            id="bookmarkname"
            placeholder="Bookmark Name"
            value={bookmarkName}
            onChange={(e) => setBookmarkName(e.target.value)}
            required // Add validation
          />
          <input
            type="url" // Use type="url" for URL validation
            id="bookmarkUrl"
            placeholder="Bookmark URL"
            value={bookmarkUrl}
            onChange={(e) => setBookmarkUrl(e.target.value)}
            required
          />
          <button type="submit">{props.bookmark ? 'Update' : 'Save'}</button> {/* Change button text */}
          <button type="button" onClick={props.onClose}>Close</button> {/* Keep close button */}
        </form>
      </div>
    </div>
  );
};


const portalElement = document.getElementById('overlays');

const Modal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay {...props} />, // Spread props to ModalOverlay
        portalElement
      )}
    </>
  );
};

export default Modal;