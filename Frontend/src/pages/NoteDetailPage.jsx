import { ArrowLeft, ArrowLeftIcon, LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { TrashIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  
  useEffect(() =>{
    const fetchNote = async () =>{
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note", error)
        toast.error("Failed to fetch note");
      }finally{
        setLoading(false);
      }
    }
    fetchNote();
  }, [id] );

const handleDelete = async () => {
  if(window.confirm("Are you sure you want to delete this note?")){
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  }
};
const handleSave = async () => {
  if(!note.title.trim() || !note.content.trim()){
    toast.error("Title and Content are required");
    return;
  }
  setSaving(true);
  try {
    await api.put(`/notes/${id}`, note);
    toast.success("Note updated successfully");
    navigate("/");
  } catch (error) {
    console.log("Error updating note", error);
    if(error.response.status === 429){
      toast.error("You are rate limited. Please try again later.", {duration: 4000, icon: "⏳"});
    }else{
      toast.error("Failed to update note");
    }
  }
  finally{
      setSaving(false);
    }
};

  if(loading){
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
    <LoaderIcon className='animate-spin size-6 mx-auto mb-4' />
    </div>
    );
  }


  return (
    <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <Link to="/" className='btn btn-ghost'>
            <ArrowLeftIcon className='size-5 mr-2' />
            <span>Back to Home</span>
          </Link>
          <button onClick={handleDelete} className='btn btn-error'>
            <TrashIcon className='size-5 mr-2' />
            Delete Note
          </button>
        </div>
        <div className='card bg-base-100'>
          <div className='card-body'>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input
                type="text"
                placeholder='Note Title'
                value={note?.title}
                className='input input-bordered'
                onChange={(e)=>setNote({...note, title:e.target.value})}
                />
            </div>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Content</span>
              </label>
              <textarea
                placeholder='write your note here...'
                value={note?.content}
                className='textarea textarea-bordered h-32'
                onChange={(e)=>setNote({...note, content:e.target.value})}
              ></textarea>
            </div>
            <div className='card-actions justify-end'>
              <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default NoteDetailPage