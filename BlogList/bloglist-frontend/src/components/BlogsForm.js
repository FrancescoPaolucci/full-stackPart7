import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Table, Form, Button } from 'react-bootstrap'
import{ correctNotification } from '../reducers/notificationReducer'
const BlogsForm = () => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [newLikes, setLikes] = useState()
  const dispatch = useDispatch()
  const addBlog = (event) => {
    event.preventDefault()
    const content=({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
    dispatch(createBlog(content))
    dispatch(correctNotification(`you added '${content.title}'`, 5))
  }

  return (
    <div className="formDiv">
      <h2> Create a new Blog </h2>
      <form onSubmit={addBlog}>
        <Form.Group>
          <div>
            <Form.Label>Title</Form.Label>
            <Form.Control
              id='title'
              type="text"
              value={newTitle}
              onChange={({ target }) => {
                setTitle(target.value)
                console.log(target.value)
              }}
            />
          </div>
          <Form.Label>Author</Form.Label>
          <Form.Control
            id='author'
            type="text"
            value={newAuthor}
            onChange={({ target }) => {
              setAuthor(target.value)
              console.log(target.value)
            }}
          />
          <div>
            <Form.Label>URL</Form.Label>
            <Form.Control
              id='url'
              type="text"
              value={newUrl}
              onChange={({ target }) => {
                setUrl(target.value)
                console.log(target.value)
              }}
            />
          </div>
          <Form.Label>Likes</Form.Label>
          <Form.Control
            id='likes'
            type="text"
            value={newLikes}
            onChange={({ target }) => {
              setLikes(target.value)
              console.log(target.value)
            }}
          />
          <div>
            <Button variant="primary" type="submit">
                   SAVE BLOG
            </Button>
          </div>
        </Form.Group>
      </form>
    </div>
  )
}

export default BlogsForm
