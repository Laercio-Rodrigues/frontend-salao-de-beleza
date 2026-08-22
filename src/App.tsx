import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppLayout } from './layouts/AppLayout'
import { ClientsPage } from './pages/clients/ClientsPage'
import { ProfessionalsPage } from './pages/professionals/ProfessionalsPage'
import { ServicesPage } from './pages/services/ServicesPage'
import { AgendaPage } from './pages/agenda/AgendaPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/clientes" replace />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/profissionais" element={<ProfessionalsPage />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path='/agenda' element={<AgendaPage />} />
      </Route>
    </Routes>
  )
}

export default App
