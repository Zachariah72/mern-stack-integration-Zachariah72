// path: client/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import NewNoteDialog from "../components/NewNoteDialog";
import NoteCard from "../components/NoteCard";
import { NotesAPI } from "../lib/api";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard({ frontendUserId }) {
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const { user, isLoaded } = useUser(); // Ensure user is loaded before accessing
  const [error, setError] = useState("");

  useEffect(() => {
    if (!frontendUserId || !isLoaded) return; // wait for Clerk user

    const fetchNotes = async () => {
      setStatus("loading");
      setError("");
      try {
        const data = await NotesAPI.list(frontendUserId);
        setNotes(data);
        setStatus("success");
      } catch (e) {
        setError(e.message || "Failed to fetch notes");
        setStatus("error");
      }
    };

    fetchNotes();
  }, [frontendUserId, isLoaded]);

  // Create a new note
  const createNote = async (payload) => {
    if (!frontendUserId || !user) return;
    try {
      const created = await NotesAPI.create({
        ...payload,
        userId: frontendUserId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      setNotes((prev) => [created, ...prev]);
    } catch (e) {
      console.error("Failed to create note:", e);
    }
  };

  // Update a note
  const saveNote = async (id, payload) => {
    try {
      const updated = await NotesAPI.update(id, payload);
      setNotes((prev) => prev.map((n) => (n._id === id ? updated : n)));
    } catch (e) {
      console.error("Failed to update note:", e);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await NotesAPI.remove(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (e) {
      console.error("Failed to delete note:", e);
    }
  };

  if (!isLoaded) return <p>Loading user info…</p>; // wait for Clerk

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {user ? `${user.firstName}'s Notes` : "Your Notes"}
        </h2>
        <NewNoteDialog onCreate={createNote} />
      </div>

      {/* Status messages */}
      {status === "loading" && <p>Loading…</p>}
      {status === "error" && <p className="text-red-600">Error: {error}</p>}
      {status === "success" && notes.length === 0 && <p>No notes yet. Create your first note!</p>}

      {/* Notes grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((n) => (
          <NoteCard key={n._id} note={n} onSave={saveNote} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}
