import { useEffect, useState } from "react";
import NewNoteDialog from "../components/NewNoteDialog";
import NoteCard from "../components/NoteCard";
import { NotesAPI } from "../lib/api";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard({ frontendUserId }) {
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("idle");
  const { user } = useUser();
  const [error, setError] = useState("");

  useEffect(()=> {
    (async () => {
      try {
        setStatus("loading");
        const data = await NotesAPI.list(frontendUserId);
        setNotes(data);
        setStatus("success");
      } catch (e) { setError(e.message); setStatus("error"); }
    })();
  }, [frontendUserId]);

  async function createNote(payload) {
    // const created = await NotesAPI.create({ 
    // ...payload, 
    // userId: frontendUserId 
    // });
    const created = await NotesAPI.create({ 
      ...payload, 
      userId: frontendUserId, 
      userEmail: user?.primaryEmailAddress?.emailAddress
    })
    setNotes(prev => [created, ...prev]);
  }
  async function saveNote(id, payload) {
    const updated = await NotesAPI.update(id, payload);
    setNotes(prev => prev.map(n => n._id === id ? updated : n));
  }
  async function deleteNote(id) {
    await NotesAPI.remove(id);
    setNotes(prev => prev.filter(n => n._id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {user ? `${user.firstName}'s Notes` : "Your Notes"}
        </h2>
        <NewNoteDialog onCreate={createNote} />
      </div>

      {status === "loading" && <p>Loading…</p>}
      {status === "error" && <p className="text-red-600">Error: {error}</p>}
      {status === "success" && notes.length === 0 && <p>No notes yet. Create your first note!</p>}

      <div className="grid gap-3">
        {notes.map(n => (
          <NoteCard key={n._id} note={n} onSave={saveNote} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}
