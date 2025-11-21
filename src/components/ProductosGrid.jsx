import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductoCard from './ProductoCard';
import ProductService from '../services/ProductService';
import ImageService from '../services/ImageService';
import { useCarrito } from '../hooks/Carrito';

const categoryMap = {
  'circular': 1,
  'cuadrada': 2,
  'individual': 3,
  'sinazucar': 4,
  'tradicional': 5,
  'singluten': 6,
  'vegano': 7,
  'especial': 8
};

const ProductosGrid = () => {
  const { categoria } = useParams();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCarrito();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        
        // Inicializar servicio de imágenes
        await ImageService.initialize();

        let response;
        
        if (categoria) {
          const categoryId = categoryMap[categoria];
          if (!categoryId) {
            setError('Categoría no válida');
            return;
          }
          response = await ProductService.getProductsByCategory(categoryId);
        } else {
          response = await ProductService.getAllProducts();
        }

        // Enriquecer productos con rutas de imagen
        const productosEnriquecidos = response.data.map(producto => ({
          ...producto,
          imagen: ImageService.getImagePath(producto.id, producto.productType?.id) 
            || producto.imagen 
            || '/datasets-tortas/default.jpg'
        }));

        setProductosFiltrados(productosEnriquecidos);
        setError(null);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [categoria]);

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div id="productos-grid">
      {productosFiltrados.length > 0 ? (
        productosFiltrados.map(producto => (
          <ProductoCard 
            key={producto.id} 
            producto={producto} 
            onAgregarAlCarrito={addToCart}
          />
        ))
      ) : (
        <p>No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default ProductosGrid;