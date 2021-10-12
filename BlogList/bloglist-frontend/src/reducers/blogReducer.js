import blogService from '../services/blogs'

const reducer = (state=[], action) => {
  switch(action.type){
  case 'INITIAL_BLOGS':
    return action.data
  case'ADD_BLOG':
    return[...state, action.data]
  case 'ADD_LIKE':{
    const id = action.data.id
    const addVoteTo = state.find((n) => n.id === id)
    const addedVote = { ...addVoteTo, likes: addVoteTo.likes }
    return state.map((voted) => (voted.id !== id ? voted : addedVote))
  }
  case 'DELETE':{
    const id = action.data.id
    state = state.filter((b) => b.id !== id)
    return state
  }
  default:
    return state

  }
}

export const initializedBlogs = () => {
  return async(dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIAL_BLOGS',
      data: blogs,
    })
  }
}

export const addVote = (object) => {
  return async (dispatch) => {
    const id = object.id

    const newObj = await blogService.Update(id, object)
    dispatch({
      type: 'ADD_LIKE',
      data: newObj,
    })
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD_BLOG',
      data:newBlog,
    })
  }
}

export const deleteBlog = (object) => {
  return async (dispatch) => {
    await blogService.elimina(object.id)
    dispatch({
      type: 'DELETE',
      data: object,
    })
  }
}

export default reducer