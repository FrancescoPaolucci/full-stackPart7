import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, AddComment } from '../reducers/blogReducer'
import { correctNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from 'react-router-dom'

const BlogDetails = () => {
  const [comment, setComment] = useState('')
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

  const addComment = async( event ,blog ) => {
    event.preventDefault()
    dispatch(AddComment(blog,comment.toString()))
    dispatch(correctNotification(`You commented '${blog.title}'`, 5))
    setComment('')

  }

  const id = useParams().id
  const blogs = stateblogs.find(b => b.id === id)
  if (!blogs) {
    return null
  }
  return    ( <div className='BlogDetails' style={null}>
    <h1> Title: {blogs.title}</h1>
    <h2> Author: {blogs.author}</h2>
    <h3> URL: {blogs.url}</h3>

    <p>
      {' '}
          Likes:{blogs.likes} <button id="LikeButton" className='LikeButton' onClick={() => vote(blogs)}>Likes</button>
    </p>
    <p>
      <button id="deleteButton" onClick={() => elimina(blogs)}>X Delete</button>
    </p>
    <form onSubmit={(e) => { addComment(e, blogs)}}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => {

          setComment(target.value)
          console.log(target)
        }}/>

      <div>
        <button type="submit">ADD COMMENT</button>
      </div>
    </form>
    <h3> COMMENTS: </h3>
    <p>{blogs.comments.map((el,index) => <p key={index}>{el}</p>)} </p>
  </div>)
}


/*
const BlogDetails = () => {
  const dispatch = useDispatch()
  const stateblogs = useSelector((state) => state.blog)
  const BlogDetail = ({ blogs }) => {
    const [allVisible, setAllVisible] = useState(false)
    const hideWhenVisible = { display: allVisible ? 'none' : '' }
    const showWhenVisible = { display: allVisible ? '' : 'none' }
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
*/
export default BlogDetails
