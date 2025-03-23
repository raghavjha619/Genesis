import { useState } from 'react'
import Index from './pages/indexeasy'
import { Outlet } from 'react-router-dom'
import { SoundProvider } from './components/SoundContext'
function App() {
  const [count, setCount] = useState(0)

  return (
    <SoundProvider> {/* Wrap everything inside SoundProvider */}
      <Outlet /> {/* This will render the active route */}
    </SoundProvider>
  )
}

export default App
