import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ setNotification, setBlogs, blogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async event => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs([...blogs, newBlog]);
      setNotification(`New blog "${newBlog.title}" added`);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.error('Error adding blog:', error);
      setNotification('Failed to add blog. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
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
