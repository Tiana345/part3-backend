// console.log('hello world');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ];


  
app.use(express.json());
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log(id);
    const note = notes.find(note => note.id===id);
    console.log(note);
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
  });

  // Delete request
  app.delete('/api/notes/:id', (request, response) =>{
    // Get the request parameter id to be deleted
const id = Number(request.params.id);
//Use the filte rmethod to remove all notes except the id
notes = notes.filter(note => note.id !==id);
// Send q status responds to say every thing went well
response.status(204).end();

  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint);
  

const PORT = process.env.PORT || 3001

app.listen(PORT);
console.log(`Server running on port ${PORT}`)