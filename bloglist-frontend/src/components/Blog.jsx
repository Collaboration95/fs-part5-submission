import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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

  return (
    <div>
      
      <div>
        {expanded ? (
          <div style={expandedStyle}> 
            <p>Title: {blog.title} <button onClick={toggleExpanded}>view details</button></p>
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p>
            <p>Likes: {blog.likes} <button>Like</button></p>
          </div>
        ) : (
          <div style={blogStyle}>
            <p>{blog.title} written by  {blog.author} <button onClick={toggleExpanded}>view details</button></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog