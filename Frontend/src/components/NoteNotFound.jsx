import React from 'react'
import { Link } from 'react-router'


const NoteNotFound = () => {
  return (
    <div className='text-center text-primary py-10'>
      <h2 className='text-2xl font-semibold mb-4'>No Notes Found</h2>
      <p className='mb-4'>It looks like you haven't created any notes yet.</p>
      <Link to="/create" className='btn btn-primary'>Create your first note</Link>
    </div> 
  )
}

export default NoteNotFound