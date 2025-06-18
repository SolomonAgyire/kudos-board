import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import BoardDetails from './pages/BoardDetails'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board/:boardId" element={<BoardDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
