import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';
import Footer from './components/Footer';
import Notes from './components/Notes';
import Create from './components/Create';

function App() {
  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addnote" element={<Create />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/about" />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            <Contact />
            <Footer />
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
