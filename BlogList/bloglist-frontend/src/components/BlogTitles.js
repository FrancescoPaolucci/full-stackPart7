import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from 'react-router-dom'

const BlogTitles = () => {
  const stateblogs = useSelector((state) => state.blog)
  return(
    <div>
      <h1>The BLOG LIST</h1>
      <Table striped>
        <tbody>
          {stateblogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blog/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogTitles