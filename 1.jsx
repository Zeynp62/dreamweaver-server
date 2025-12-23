//import Post from "./Post"
import axios from 'axios'
import { useState } from 'react'

const Comment = ({ comment }) => {
  const [comments, setComments] = useState([])
  const [threadForm, setThreadForm] = useState({
    username: '',
    thread: ''
  })

  const handleChange = (e) => {
    setThreadForm({ ...threadForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const res = await axios.get('http://localhost:3001/comment', threadForm, {
        headers: { authorization: `Bearer ${token}` }
      })
      console.log(res.data)

      setComments([...comments, res.data])
      setThreadForm({ username: '', thread: '' })
    } catch (err) {
      console.error('Failed to post comment:', err)
    }
  }

  return (
    <>
      <div className="comment-page">
        <form className="comment-form" onSubmit={handleSubmit}>
          <label htmlFor="username">userName</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={threadForm.username}
          />
          <label htmlFor="thread">comment</label>
          <textarea
            name="thread"
            rows="4"
            cols="12"
            onChange={handleChange}
            value={threadForm.thread}
          ></textarea>
          <button type="submit">Comment</button>
        </form>
      </div>
      <div className="comment-list">
        {comments.map((comment, index) => (
          <div className="comment-item">
            <p>{comment.username}</p>
            <p>{comment.thread}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Comment
