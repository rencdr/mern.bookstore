import React from 'react'
import { Routes, Route} from 'react-router-dom'
import CreateBooks from './pages/CreateBooks'
import DeleteBooks from './pages/DeleteBooks'
import ShowBooks from './pages/ShowBooks'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/create' element={<CreateBooks/>} />
      <Route path='/books/delete' element={<DeleteBooks/>} />
      <Route path='/books' element={<ShowBooks/>} />
    </Routes>
  )
}

export default App