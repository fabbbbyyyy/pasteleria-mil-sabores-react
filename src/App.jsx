import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './style.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Catalogo from './pages/Catalogo';
import ProductosPage from './pages/Productos';
import Home from './pages/Home';
import Recomendaciones from './pages/Recomendaciones';
import Comunidad from './pages/Comunidad';
import Carrito from './pages/Carrito';
import { CarritoProvider } from './hooks/Carrito';
import Historia from './pages/Historia';
import Perfil from './pages/Perfil';
import Registro from './pages/registro';
import Login from './pages/login';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  return (
    <CarritoProvider>
    <Router>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/productos/:categoria" element={<ProductosPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/perfil" element={<Perfil />} />        
        <Route path="/registro" element={<Registro />} />        
        <Route path="/login" element={<Login />} />        
        <Route path="/productform" element={<ProductForm />} />      
        <Route path="/productlist" element={<ProductList />} />       
      </Routes>
      <Footer />
    </Router>
    </CarritoProvider>
  );
}

export default App;
