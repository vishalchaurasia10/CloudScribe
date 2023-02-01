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
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
