import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import NewClient from './pages/NewClient'
import EditClient from './pages/EditClient'
import Home from './pages/Home'
import ViewClient from './pages/ViewClient'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="nuevo" element={<NewClient />} />
          <Route path="editar/:id" element={<EditClient />} />
          <Route path=":id" element={<ViewClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
