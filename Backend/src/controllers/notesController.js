import Note from '../../models/Note.js';
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
}  

export async function getNoteById(req, res) {
  try{
    const note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).json({ message: "ei note ta khuje pai nai" });
    }
    res.status(200).json(note);
  }catch(error){
    console.error('Error fetching note by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createNote(req, res) {
  try{
    const { title, content } = req.body;
    if(!title || !content){
      return res.status(400).json({ message: "Title and content are required" });
    }
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  }
  catch(error){
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateNote(req, res) {
  try{
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id, { title, content }, {new: true}
    );
    if(!updateNote){
      return res.status(404).json({ message: "Note not found" });
    } 

    res.status(200).json(updateNote)
  }catch(error){
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteNote(req, res){
  try{
    const { title, content } = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id, { title, content }, {new: true}
    );
    if(!deletedNote){
      return res.status(404).json({ message: "delete je korbo kichu e to khuje pai na" });
    }
    res.status(200).json({ message: " de lit kore disi" });
  }catch(error){
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "delet er somoy Server error hoise" });
  }
}


