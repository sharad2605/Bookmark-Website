const BookmarkList = () => {
    const { bookmarks, deleteBookmark } = useContext(BookmarkContext);
  
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

  
  export default BookmarkList;