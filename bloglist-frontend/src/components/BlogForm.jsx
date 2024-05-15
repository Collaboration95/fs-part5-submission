
import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ setNotification, setBlogs, blogs ,onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = event => {
    event.preventDefault();
    onAdd({title,author,url}).then(response=>{
      if(response.status=='success'){
        setNotification(`New blog "${title}" added`);
        setBlogs([...blogs, response.data]);
        setTitle('');
        setAuthor('');
        setUrl('');
      } else {
        console.log('error',response);
      }
    })
    .catch(error=>{
      console.error('Error adding blog:', error);
    })
  };

  return (
    <div>
    <h2>Add New Blog</h2>
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  </div>
  );
};

export default BlogForm;
