import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import RequireAuth from './components/RequireAuth'
import Avtorji from './pages/Avtorji/Avtorji'
import AvtorPodrobnosti from './pages/Avtorji/AvtorPodrobnosti'
import Prijava from './pages/Prijava/Prijava'
import Projekti from './pages/Projekti/Projekti'
import Uredniki from './pages/Uredniki/Uredniki'

function PortalLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/prijava" element={<Prijava />} />
      <Route element={<RequireAuth />}>
        <Route element={<PortalLayout />}>
          <Route path="/" element={<Navigate to="/projekti" replace />} />
          <Route path="/projekti" element={<Projekti />} />
          <Route path="/uredniki" element={<Uredniki />} />
          <Route path="/avtorji" element={<Avtorji />} />
          <Route path="/avtorji/nov" element={<AvtorPodrobnosti />} />
          <Route path="/avtorji/:id" element={<AvtorPodrobnosti />} />
          <Route path="*" element={<Navigate to="/projekti" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
