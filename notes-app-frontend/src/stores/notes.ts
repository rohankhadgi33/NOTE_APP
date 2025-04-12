export {}

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/services/api'

interface Note {
  id: number
  userId: number
  title: string
  content: string | null
  createdAt: string
  updatedAt: string | null
}

export const useNotesStore = defineStore('notes', () => {
  // Define 'notes' as an array of 'Note' objects
  const notes = ref<Note[]>([])

  // Fetch all notes for a user
  async function fetchNotes(userId: number) {
    const res = await api.get(`/notes/user/${userId}`)
    // Explicitly cast the response data as Note[]
    notes.value = res.data as Note[]
  }

  // Fetch a specific note by its ID
  async function fetchNoteById(id: number, userId: number) {
    const res = await api.get(`/notes/${id}/user/${userId}`)
    // Explicitly cast the response data as Note
    return res.data as Note
  }

  // Add a new note
  async function addNote(note: Note) {
    const res = await api.post('/notes', note)
    notes.value.push(res.data as Note)
  }

  // Update an existing note
  async function updateNote(note: Note) {
    await api.put(`/notes/${note.id}`, note)
    await fetchNotes(note.userId)
  }

  // Delete a note
  async function deleteNote(id: number, userId: number) {
    await api.delete(`/notes/${id}/user/${userId}`)
    await fetchNotes(userId)
  }

  return { notes, fetchNotes, fetchNoteById, addNote, updateNote, deleteNote }
})
