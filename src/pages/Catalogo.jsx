import React from 'react';
import { Link } from 'react-router-dom';

export default function Catalogo() {
  return (
    <section id="centro">
      <div id="catal"><h1>Catálogo</h1></div>
      
      <div id="catalogo">
        <div className="card">
          <img src="datasets-tortas/221.jpg" alt="Tortas Cuadradas"/>
          <Link to="/productos/cuadrada">Tortas Cuadradas</Link>
        </div>
        
        <div className="card" id="circular">
          <img src="datasets-tortas/003.jpg" alt="Tortas Circulares"/>
          <Link to="/productos/circular">Tortas Circulares</Link>
        </div>
        
        <div className="card">
          <img src="datasets-tortas/108.jpg" alt="Postres Individuales" />
          <Link to="/productos/individual">Postres Individuales</Link>
        </div>
        
        <div className="card">
          <img src="datasets-tortas/060.jpg" alt="Productos Sin Azúcar"/>
          <Link to="/productos/sinazucar">Productos Sin Azúcar</Link>
        </div>
        
        <div className="card">
          <img src="datasets-tortas/087.jpg" alt="Pastelería Tradicional"/>
          <Link to="/productos/tradicional">Pastelería Tradicional</Link>
        </div>
        
        <div className="card">
          <img src="datasets-tortas/226.jpg" alt="Productos sin gluten"/>
          <Link to="/productos/singluten">Productos sin gluten</Link>
        </div>
        
        <div className="card">
          <img src="datasets-tortas/227.jpg" alt="Productos Vegana"/>
          <Link to="/productos/vegano">Productos Vegana</Link>
        </div>
        
        <div className="card">
          <img src="datasets-tortas/014.jpg" alt="Tortas Especiales"/>
          <Link to="/productos/especial">Tortas Especiales</Link>
        </div>
      </div>
    </section>
  );
}