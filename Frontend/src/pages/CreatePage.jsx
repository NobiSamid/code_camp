import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import axios from 'axios'


const CreatePage = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState("")
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!title || !content.trim()){
      toast.error("Title and Content are required")
      return
    }
    setLoading(true)
    try {
      await axios.post('http://localhost:5001/api/notes', {title, content})
      toast.success("Note created successfully")
      navigate('/')
    } catch (error) {
      console.log("Error creating note", error)
      toast.error("Failed to create note")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to="/" className='text-blue-500 hover:underline mb-4 inline-block'>&larr; Back to Home</Link>
          <div className='card bg-base-100' >
            <div className='card-body'>
              <h2 className='card-title text-2xl font-bold mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label htmlFor='content' className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
                  <textarea 
                    id="content" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    rows="6"
                   
                  ></textarea>
                </div>
                <button 
                  type='submit' 
                  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage