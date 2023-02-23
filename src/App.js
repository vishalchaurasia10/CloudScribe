import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';
import ModeState from './context/modes/ModeState';
import QueryState from './context/query/QueryState';
import Footer from './components/Footer';
import Notes from './components/Notes';
import Create from './components/Create';
import { useState } from 'react';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Music from './components/Music';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message,
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  return (
    <div>
      <ModeState>
        <NoteState>
          <QueryState>
            <BrowserRouter>
              <Navbar showAlert={showAlert} />
              <Alert alert={alert} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addnote" element={<Create showAlert={showAlert} />} />
                <Route path="/notes" element={<Notes showAlert={showAlert} />} />
                <Route path="/login" element={<Login showAlert={showAlert} />} />
                <Route path="/signup" element={<Signup showAlert={showAlert} />} />
                <Route path="/music" element={<Music />} />
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
              <Contact />
              <Footer />
            </BrowserRouter>
          </QueryState>
        </NoteState>
      </ModeState>
    </div>
  );
}

export default App;
