import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/blogReducer'
import { correctNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const stateblogs = useSelector((state) => state.blog)
  const vote = async (blog) => {
    dispatch(addVote(blog))
    dispatch(correctNotification(`you voted '${blog.title}'`, 5))
  }
  const elimina = async (blog) => {
    if (
      window.confirm(`Do you really want to delete this blog = ${blog.name}?`)
    ) {
      dispatch(deleteBlog(blog))
      dispatch(correctNotification(`you deleted '${blog.title}'`, 5))
    }
  }

  const BlogDetail = ({ blogs }) => {
    const [allVisible, setAllVisible] = useState(false)
    const hideWhenVisible = { display: allVisible ? 'none' : '' }
    const showWhenVisible = { display: allVisible ? '' : 'none' }
    return (
      <div id='blogdiv'>
        <div  className='Blogs' style={hideWhenVisible}>
          <p> {blogs.title}</p>
          <button id="showButton" onClick={() => setAllVisible(true)}>Show</button>
        </div>
        <div className='BlogDetails' style={showWhenVisible}>
          <p> Title: {blogs.title}</p>
          <p> Author: {blogs.author}</p>
          <p> URL: {blogs.url}</p>
          <p>
            {' '}
          Likes:{blogs.likes} <button id="LikeButton" className='LikeButton' onClick={() => vote(blogs)}>Likes</button>
          </p>
          <p>
            <button id="deleteButton" onClick={() => elimina(blogs)}>X Delete</button>
          </p>
          <p>
            <button onClick={() => setAllVisible(false)}>Hide</button>
          </p>
        </div>
      </div>
    )
  }
  return(
    <div>
      {stateblogs.map((blog) => (
        <BlogDetail key={blog.id} blogs={blog}/>
      ))}
    </div>
  )
}

export default BlogDetails
