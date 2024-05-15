import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog , onDelete,onLike}) => {
  const [expanded, setExpanded] = useState(false);
  const [likes,setLikes] = useState(blog.likes)

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const updateBlog = () => { 
    onLike(blog).then(response=>
      { 
        if(response.status=='success'){setLikes(likes+1)} else{console.log('error',response)}}
    )
    .catch(error=>console.log('error',error))
  }

  const blogStyle = {
    border: 'solid',
    width: 'fit-content',
    borderWidth: 2,
    marginBottom: 5,
    padding: 10
  };
  
  const inlineBlockStyle = {
    display: 'inline-block',
    marginRight: '10px' // Optional: Adds spacing between elements
  };
  
  const paragraphStyle = {
    display: 'inline',
    margin: 0
  };
  
  const expandedStyle = {
    border: '1px solid #ccc',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f0f0f1',
    borderRadius: '8px',
    width: 'fit-content',
    font: '30px Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };
  
  const paragraphStyle2 = {
    margin: '5px 0',
    fontSize: '20px',
    color: '#333',
  };
  
  const buttonStyle = {
    padding: '5px 10px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '3px',
    cursor: 'pointer',
    marginLeft: '5px',
    transition: 'background-color 0.3s ease', // optional for smooth background changes
  };
  

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
     <p style={paragraphStyle2}>
       Title: {blog.title}
       <button
         style={buttonStyle}
         onClick={toggleExpanded}
       >
         Hide
       </button>
     </p>
     <p style={paragraphStyle2}>Author: {blog.author}</p>
     <p style={paragraphStyle2}>URL: {blog.url}</p>
     <p style={paragraphStyle2}>
       Likes: {likes}
       <button
         style={buttonStyle}
         onClick={updateBlog}
       >
         Like
       </button>
     </p>
     <p style={paragraphStyle2}>Added by: {blog.user.name}</p>
     <button
       style={{ 
         ...buttonStyle, 
         backgroundColor: '#dc3545',
       }}
       onClick={handleDelete}
     >
       Delete
     </button>
   </div>
        ) : (
          <div style={blogStyle}>
          <p style={paragraphStyle}>{blog.title} </p>
          <span style={inlineBlockStyle}> written by </span>
          <span style={inlineBlockStyle}>{blog.author}</span>
          <button onClick={toggleExpanded} style={inlineBlockStyle}>view details</button>
        </div>
        
        )}
      </div>
    </div>
  );
};

export default Blog