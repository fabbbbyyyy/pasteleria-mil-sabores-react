// context/CarritoContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        localStorage.removeItem('shoppingCart');
      }
    }
  }, []);

  // Guardar en localStorage cuando el carrito cambie
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito con cantidad específica
  const addToCart = (product, quantity = 1) => {
    
    if (!product || !product.id) {
      console.error('Producto inválido:', product);
      return;
    }

    const quantityToAdd = Math.max(1, Math.min(10, quantity));

    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex >= 0) {
        // Si ya existe, actualizar la cantidad
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[existingProductIndex].quantity + quantityToAdd;
        
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: Math.min(newQuantity, 10)
        };
        
        return updatedCart;
      } else {
        // Si no existe, agregar nuevo producto
        const newCart = [...prevCart, { 
          ...product, 
          quantity: quantityToAdd 
        }];
        return newCart;
      }
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Actualizar cantidad específica de un producto
  const updateQuantity = (productId, newQuantity) => {
    const validQuantity = Math.max(1, Math.min(10, newQuantity));
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: validQuantity }
          : item
      )
    );
  };

  // Incrementar cantidad en 1
  const incrementQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrementar cantidad en 1 (elimina si llega a 0)
  const decrementQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId) {
          if (item.quantity <= 1) {
            return null; // Marcar para eliminar
          }
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item !== null)
    );
  };

  // Limpiar carrito completo
  const clearCart = () => {
    setCart([]);
  };

  // Calcular precio total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price || item.precio) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  // Calcular total de items en el carrito
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Obtener la cantidad de un producto específico en el carrito
  const getProductQuantity = (productId) => {
    const product = cart.find(item => item.id === productId);
    return product ? product.quantity : 0;
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isInCart,
    getProductQuantity
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};