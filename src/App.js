import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EncomiendaApp from './pages/EncomiendaApp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f6f2ff' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <EncomiendaApp />
      </div>
      <Footer />
    </div>
  );
}

export default App;