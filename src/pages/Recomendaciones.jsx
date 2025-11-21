import React, { useEffect, useState } from 'react';
import ProductoCard from '../components/ProductoCard';
import ProductService from '../services/ProductService';
import ImageService from '../services/ImageService';
import { useCarrito } from '../hooks/Carrito';

const Recomendaciones = () => {
  const [productosRecomendados, setProductosRecomendados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCarrito();

  useEffect(() => {
    const cargarProductosRecomendados = async () => {
      try {
        setLoading(true);
        
        // Inicializar servicio de imágenes
        await ImageService.initialize();

        // Obtener todos los productos de la API
        const response = await ProductService.getAllProducts();

        // Filtrar productos con precio menor a 30.000
        const recomendados = response.data.filter(producto => producto.price < 30000);

        // Agrupar por categoría y tomar máximo 2 de cada una
        const productosPorCategoria = {};
        const productosFiltrads = [];

        recomendados.forEach(producto => {
          const categoryId = producto.productType?.id;
          
          if (!productosPorCategoria[categoryId]) {
            productosPorCategoria[categoryId] = 0;
          }
          
          if (productosPorCategoria[categoryId] < 2) {
            productosFiltrads.push(producto);
            productosPorCategoria[categoryId]++;
          }
        });

        // Enriquecer productos con rutas de imagen
        const productosEnriquecidos = productosFiltrads.map(producto => ({
          ...producto,
          imagen: ImageService.getImagePath(producto.id, producto.productType?.id)
            || producto.imagen
            || '/datasets-tortas/default.jpg'
        }));

        setProductosRecomendados(productosEnriquecidos);
        setError(null);
      } catch (err) {
        console.error('Error cargando productos recomendados:', err);
        setError('No se pudieron cargar los productos recomendados');
      } finally {
        setLoading(false);
      }
    };

    cargarProductosRecomendados();
  }, []);

  if (loading) return <div className="loading">Cargando recomendaciones...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section id="centro">
      <div id="catal">
        <h1>Recomendaciones</h1>
      </div>
      <div id="productos-grid">
        {productosRecomendados.length === 0 ? (
          <p>No hay productos recomendados disponibles.</p>
        ) : (
          productosRecomendados.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregarAlCarrito={addToCart}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Recomendaciones;