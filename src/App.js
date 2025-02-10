import React from 'react';
import './App.css';
import BookmarkList from './component/Bookmark/BookMarkList';


import AddNewBookmark from './component/Bookmark/AddNewBookmark';

function App() {

  return (
    
      <div>
        <h1>Bookmark Website</h1>
        <AddNewBookmark/>
        <BookmarkList/>
  
      </div>

  );
}



export default App;