
import Header from './components/Header/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Projekti from './pages/Projekti/Projekti'
import Uredniki from './pages/Uredniki/Uredniki'
import Avtorji from './pages/Avtorji/Avtorji'
import Prijava from './pages/Prijava/Prijava'

function App() {
  const { pathname } = useLocation()
  const isLoginPage = pathname === '/prijava'

  return (
    <>
      {!isLoginPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/projekti" replace />} />
          <Route path="/projekti" element={<Projekti />} />
          <Route path="/uredniki" element={<Uredniki />} />
          <Route path="/avtorji" element={<Avtorji />} />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="*" element={<Navigate to="/projekti" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
