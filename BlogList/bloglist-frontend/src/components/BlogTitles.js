import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from 'react-router-dom'

const BlogTitles = () => {
  const stateblogs = useSelector((state) => state.blog)
  return(
    <div>
      {stateblogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </div>
  )
}

export default BlogTitles