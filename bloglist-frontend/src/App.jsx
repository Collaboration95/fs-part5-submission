import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import BlogForm from './components/BlogForm';

const App = () => {
  const [notification, setNotification] = useState(null);
  const [loginVisible,setLoginVisible] = useState(false);
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
    const loggedUserJSON = window.localStorage.getItem('userCredentials')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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

 

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs App </h2>
      {notification !== null ? (
        <div style={notification.includes('error') ? errorNotificationStyle : notificationStyle}>
          {notification}
        </div>
      ) : null}

      {user === null ? (
        loginForm()

  // <LoginForm handleLogin={handleLogin} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} />
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
            <br/>
          <Togglable buttonLabel="new blog">
          <BlogForm setNotification={setNotification} setBlogs={setBlogs} blogs={blogs} />
          </Togglable>
        </div>
      )}
    <br/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
