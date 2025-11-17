import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from '../modules/landing-page/landing-page'

function App() {
  return (
    <Routes>
      <Route path="/memories-bakery" element={<Home />} />
    </Routes>
  );
}

export default App
