import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog , onDelete}) => {
  const [expanded, setExpanded] = useState(false);
  const [likes,setLikes] = useState(blog.likes)

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const updateBlog = () => { 
    const Blogid = blog.id
    const updatedBlog = {
      ...blog,
      user:blog.user.id,
      likes: likes + 1
    }

    blogService.update(Blogid,updatedBlog).then(response => {
      setLikes(likes+1)
    }).catch(error => {
      console.log('error', error)
    })

  }

  const expandedStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 6,
  backgroundColor: '#f0f0f1',
    width:'fit-content'
  };

  const blogStyle = {
    width:'fit-content',
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    padding: 10
  }

  const handleDelete = () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author}`)){
      onDelete(blog)
    }
    else{
      console.log('Delete cancelled')
    }
  }

  return (
    <div className='blog'>
      <div>
        {expanded ? (
          <div style={expandedStyle}> 
            <p>Title: {blog.title} <button onClick={toggleExpanded}>view details</button></p>
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p>
            <p>Likes: {likes} <button onClick={updateBlog}>Like</button></p>
            <p>Added by: {blog.user.name}</p>
            <button onClick={handleDelete}>delete</button>
          </div>
        ) : (
          <div style={blogStyle}>
            <div><div>{blog.title}</div> written by <div>{blog.author}</div> <button onClick={toggleExpanded}>view details</button></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog