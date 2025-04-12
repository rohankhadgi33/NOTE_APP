<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ isNew ? 'Create Note' : 'Edit Note' }}</h1>
    
    <!-- Edit Form -->
    <input v-model="note.title" class="border p-2 w-full rounded mb-2" placeholder="Note Title" />
    <textarea v-model="note.content" class="border p-2 w-full rounded mb-2" placeholder="Note Content"></textarea>
    
    <div>
      <button @click="saveNote" class="bg-green-500 text-white px-4 py-2 rounded">Save</button>
      <button v-if="!isNew" @click="deleteNote" class="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

const route = useRoute()
const router = useRouter()
const store = useNotesStore()
const userId = 1  // Replace with actual user ID

const note = ref<any>({ title: '', content: '', id: +route.params.id, userId })
const isNew = route.params.id === 'new'

onMounted(async () => {
  if (!isNew) {
    const fetchedNote = await store.fetchNoteById(note.value.id, userId)
    if (fetchedNote) {
      note.value = fetchedNote
    }
  }
})

function saveNote() {
  if (isNew) {
    store.addNote(note.value)
  } else {
    store.updateNote(note.value)
  }
  router.push('/')
}

function deleteNote() {
  store.deleteNote(note.value.id, userId)
  router.push('/')
}
</script>
