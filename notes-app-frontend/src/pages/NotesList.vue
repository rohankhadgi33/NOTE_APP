<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">My Notes</h1>
    
    <!-- Search/Filter Section -->
    <div class="mb-4">
      <input v-model="searchQuery" placeholder="Search notes..." class="border p-2 rounded w-full mb-2" />
      <button @click="createNote" class="bg-blue-500 text-white px-4 py-2 rounded">Add Note</button>
    </div>

    <!-- Notes Table -->
    <div class="overflow-x-auto shadow-md rounded-lg">
      <table class="min-w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">Title</th>
            <th class="px-4 py-2 text-left">Created At</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in filteredNotes" :key="note.id">
            <td class="px-4 py-2">{{ note.title }}</td>
            <td class="px-4 py-2">{{ formatDate(note.createdAt) }}</td>
            <td class="px-4 py-2">
              <router-link :to="`/note/${note.id}`" class="text-blue-500">Edit</router-link> |
              <button @click="deleteNote(note.id)" class="text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const store = useNotesStore()
const router = useRouter()
const userId = 1  // Replace with actual user ID

onMounted(() => {
  store.fetchNotes(userId)
})

const filteredNotes = computed(() => {
  return store.notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (note.content && note.content.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

function createNote() {
  router.push('/note/new') // Navigate to note creation page
}

function deleteNote(id: number) {
  store.deleteNote(id, userId)
}
</script>

<style scoped>
/* Add some basic styling */
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
}
</style>
