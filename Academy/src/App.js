import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import Programs from "./components/Programs";

import Facilities from "./components/Facilities";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import VoiceAssistant from './components/VoiceAssistant';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path="/programs" element={<Programs />} />
   
      
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
    

      </Routes>
    </BrowserRouter>
    <VoiceAssistant />
    </div>
  );
}

export default App;
