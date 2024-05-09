import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

// const App = () => {
//   const [notification, setNotification] = useState(null);
//   const [blogs, setBlogs] = useState([])
//   const [username, setUsername] = useState('') 
//   const [password, setPassword] = useState('') 
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     blogService.getAll().then(blogs =>
//       setBlogs( blogs )
//     )  
//   }, [])

//   const handleLogin = async event => {
//     event.preventDefault();
  
//     try {
//       const user = await loginService.login({
//         username,
//         password,
//       });
//       blogService.setToken(user.token);
//       setUser(user);
//       setUsername('');
//       setPassword('');
//     } catch (error) {
//       if (error.response.status === 401) {
//         setNotification('Wrong username or password');
//       } else {
//         // Handle other errors
//         console.error('Error:', error);
//         setNotification('An error occurred. Please try again later.');
//       }
//       setTimeout(() => {
//         setNotification(null);
//       }, 5000);
//     }
//   };
  

//   const loginForm = () => (
//     <form onSubmit={handleLogin}>
//       <div>
//         username
//           <input
//           type="text"
//           value={username}
//           name="Username"
//           onChange={({ target }) => setUsername(target.value)}
//         />
//       </div>
//       <div>
//         password
//           <input
//           type="password"
//           value={password}
//           name="Password"
//           onChange={({ target }) => setPassword(target.value)}
//         />
//       </div>
//       <button type="submit">login</button>
//     </form>      
//   )

//   // const noteForm = () => (
//   //   <form onSubmit={addNote}>
//   //     <input
//   //       value={newNote}
//   //       onChange={handleNoteChange}
//   //     />
//   //     <button type="submit">save</button>
//   //   </form>  
//   // )

  
//   const notificationStyle = {
//     color: 'green',
//     background: 'lightgrey',
//     fontSize: 20,
//     borderStyle: 'solid',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10
//   };
//   return (
//     <div>
//        {notification !== null ? <div style={notificationStyle} >{notification}</div> : null}

// {user === null ?
//       loginForm() :
//       <div>
//         <p>{user.name} logged-in</p>
//         {/* {noteForm()} */}
//       </div>
//     }

//       <h2>blogs</h2>
//       {blogs.map(blog =>
//         <Blog key={blog.id} blog={blog} />
//       )}
//     </div>
//   )
// }

// export default App

import BlogForm from './components/BlogForm';

const App = () => {
  const [notification, setNotification] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userCredentials ')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'userCredentials', JSON.stringify(user)
      ) 
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error.response.status === 401) {
        setNotification('error Wrong username or password');
        setUsername('');
        setPassword('');
      } else {
        console.error('Error:', error);
        setNotification('An error occurred. Please try again later.');
      }
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

    const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
    const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };
  const errorNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return (
    <div>
      {notification !== null ? (
        <div style={notification.includes('error') ? errorNotificationStyle : notificationStyle}>
          {notification}
        </div>
      ) : null}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} is logged-in</p>
          <button
            onClick={() => {
              window.localStorage.removeItem('userCredentials');
              setUser(null);
            }}
          >
            Log Out
          </button>
          <BlogForm setNotification={setNotification} setBlogs={setBlogs} blogs={blogs} />
        </div>
      )}

      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
