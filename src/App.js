import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addnote" />
              <Route path="/notes" />
              <Route path="/about" />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            <Contact/>
            <Footer />
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
