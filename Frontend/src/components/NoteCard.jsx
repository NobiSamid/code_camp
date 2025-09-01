import { PenSquareIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'

const NoteCard = ({note}) => {
  return (
    <Link to={`/note/${note._id}`}
    className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
    <div className='card-body'>
      <h3 className='card-title text-lg font-bold mb-2'>{note.title}</h3>
      <p className='text-gray-600 mb-4'>{note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}</p>
      <div className='text-sm text-gray-500'>Last Updated: {new Date(note.updatedAt).toLocaleDateString()}</div> 
      <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
      <div className='flex items-center gap-1'>
        <PenSquareIcon className='size-4' />
        <button className='text-sm text-blue-500 hover:underline'><TrashIcon className='size-4 text-error'></TrashIcon></button>
      </div>
    </div>
      
  </Link>)
}

export default NoteCard