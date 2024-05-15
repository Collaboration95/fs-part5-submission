import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
// import 

const blog = {
    id: '1',
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: {
      id: 'user1',
      name: 'Test User'
    }
  };

test ('renders blog',()=>{
    render(<Blog blog={blog} />)
    const element = screen.getByText(blog.title)
    screen.debug()
    expect(element).toBeDefined()

})

test('checks default render methods',()=>{
    render(<Blog blog={blog} />)
    const titleElement = screen.getByText(blog.title)
    const authorElement = screen.getByText(blog.author)
    const urlElement = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(blog.likes)
    expect (titleElement).toBeDefined()
    expect (authorElement).toBeDefined()
    expect (urlElement).toBeNull()
    expect (likesElement).toBeNull()
    
    expect(titleElement).toBeDefined()
})


test('5.14 clicking view details expands the blog ', ()=>{
  render(<Blog blog={blog} />)
  const button = screen.getByText('view details')
  userEvent.click(button)
  const urlElement = screen.queryByText(blog.url)
  const likesElement = screen.queryByText(blog.likes)
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('5.15 clicking like button twice calls event handler twice', async () => {
  const mockHandler = vi.fn().mockResolvedValue({ status: 'success' });
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 0,
    user: { id: '123', name: 'Test User' }
  };

  render(<Blog blog={blog} onLike={mockHandler} />);

  const button = screen.getByText('view details');
  await userEvent.click(button);

  const likeButton = screen.getByText('LikeButton');
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
