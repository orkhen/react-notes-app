import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    let [note, setNote] = useState(null)

    useEffect(() => {
      getNote()
    }, [id])

    const getNote = async () => {
      if (id === 'new') {
        return
      }
      const response = await fetch(`https://dj-react-notesapp-b38385cac4bd.herokuapp.com/notes/${id}`)
      const data = await response.json()
      setNote(data)
    }

    const createNote = async () => {
      await fetch(`http://localhost:8000/notes/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...note, 'updated': new Date() })
      })
    }

    const updateNote = async () => {
      await fetch(`http://localhost:8000/notes/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...note, 'updated': new Date() })
      })
    }

    const deleteNote = async () => {
      await fetch(`http://localhost:8000/notes/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
      })
      navigate(-1)
    }

    const handleSubmit = () => {

      if (id !== 'new' && !note.body) {
        deleteNote()
      } else if (id !== 'new') {
        updateNote()
      } else if (id === 'new' && note !== null) {
        createNote()
      }
      navigate(-1)
    }

    return (
    <div className='note'>
        <div className='note-header'>
            <h3>
              <Link to='/'>
                <ArrowLeft onClick={handleSubmit}/>
              </Link>
            </h3>

            {id !== 'new' ? (
              <button onClick={deleteNote}>Delete</button>
            ) : (<button onClick={handleSubmit}>Done</button>)}
        </div>
        
        <textarea value={note?.body} onChange={(e) => {setNote({...note, 'body': e.target.value})}}>
          
        </textarea>
    </div>
  )
}

export default NotePage
