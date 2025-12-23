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
      const res = await axios.post(
        'http://localhost:3001/comment',
        threadForm,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log(res.data)
      setComments([...comments, res.data])
      setThreadForm({ username: '', thread: '' })
    } catch (err) {
      console.error('Failed to post comment:', err)
    }
  }
  return (
    <div className="comment-page">
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={threadForm.username}
        />
        <label htmlFor="thread">Comment</label>
        <textarea
          name="thread"
          rows="4"
          cols="12"
          onChange={handleChange}
          value={threadForm.thread}
        />
        <button type="submit">Comment</button>
      </form>
      <div className="comment-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p>{comment.username}</p>
            <p>{comment.thread}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Comment
