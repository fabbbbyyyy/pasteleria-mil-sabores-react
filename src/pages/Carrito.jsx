import React from 'react';
import { useCarrito } from '../hooks/Carrito';
import { Link } from 'react-router-dom';

const CarritoPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCarrito();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Aquí puedes implementar la lógica de checkout
    alert('¡Gracias por tu compra! Total: $' + getTotalPrice().toLocaleString('es-CL'));
    clearCart();
  };

  if (cart.length === 0) {
    return (
     <section id="centro">
    <section id="carro">
        <div className="carrito-vacio">
          <div className="carrito-vacio-icono">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </div>
          <h2>Tu carrito está vacío</h2>
          <p>¡Descubre nuestros productos y encuentra algo especial!</p>
          <Link to="/catalogo" className="btn-agregar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            Seguir Comprando
          </Link>
        </div>
      </section>
      </section>
    );
  }

  return (

     <section id="carro">
        <h1>Carrito de Compras</h1>
        <div className='cart-content'>
      <div className="cart-items">
          {cart.map(item => {
            // Mapeo de propiedades para soportar tanto datos locales como de API
            const nombre = item.name || item.nombre;
            const descripcion = item.description || item.descripcion;
            const precio = item.price || item.precio;
            const imagen = item.imagen;

            return (
            <div key={item.id} className="item">
              <div className="producto-imagen">
                <img src={imagen} alt={nombre} />
              </div>
              
              <div className="producto-info">
                <h3>{nombre}</h3>
                <p className="producto-descripcion">{descripcion}</p>
                <div className="producto-precio">${precio?.toLocaleString('es-CL')} CLP c/u</div>
                
                <div className="producto-acciones">
                  <button 
                    className="btn-agregar btn-eliminar"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="carrito-controls">
                <div className="cantidad-selector">
                  <button 
                    className="cantidad-btn"
                    onClick={() => decrementQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                    max="10"
                    className="cantidad-input"
                  />
                  <button 
                    className="cantidad-btn"
                    onClick={() => incrementQuantity(item.id)}
                    disabled={item.quantity >= 10}
                  >
                    +
                  </button>
                </div>
                <div className="producto-precio total-item">
                  ${((item.price || item.precio || 0) * item.quantity).toLocaleString('es-CL')} CLP
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <div className="carrito-resumen">
          <div className="producto-card resumen-card">
            <h3>Resumen del Pedido</h3>
            
            <div className="resumen-linea">
              <span>Productos ({getTotalItems()})</span>
              <span className="producto-precio">${getTotalPrice().toLocaleString('es-CL')} CLP</span>
            </div>
            
            <div className="resumen-linea">
              <span>Envío</span>
              <span className="producto-precio envio-gratis">Gratis</span>
            </div>
            
            <div className="resumen-separador"></div>
            
            <div className="resumen-total">
              <span>Total</span>
              <span className="producto-precio total-final">${getTotalPrice().toLocaleString('es-CL')} CLP</span>
            </div>

            <div className="producto-acciones resumen-acciones">
              <button 
                className="btn-agregar btn-finalizar-compra"
                onClick={handleCheckout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                Finalizar Compra
              </button>

              <button 
                className="btn-agregar btn-vaciar-carrito"
                onClick={clearCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                Vaciar Carrito
              </button>

              <Link to="/" className="btn-agregar btn-seguir-comprando">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
                Seguir Comprando
              </Link>
            </div>
          </div>
          </div>
        </div>
    </section>
  );
};

export default CarritoPage;