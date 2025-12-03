import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navigation = () => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.roleId === 1;

  return (
    <nav id="buttons">
      <Link to="/carrito" title="Carrito">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg> Carrito
        </button>
      </Link>
      
      {isAuthenticated && (
        <>
          <Link to="/pedido" title="Pedidos">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box2-heart" viewBox="0 0 16 16">
                <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982"/>
                <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zm0 1H7.5v3h-6zM8.5 4V1h3.75l2.25 3zM15 5v10H1V5z"/>
              </svg> Pedidos
            </button>
          </Link>
          <Link to="/envio" title="Gestión Envíos">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
              </svg> Gestión Envíos
            </button>
          </Link>
          
          {isAdmin && (
            <Link to="/usuarios" title="Gestión de Usuarios">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.26-1.477c0-.7.093-1.786.213-2.001.49.923 1.446 1.35 2.169 1.384 0 0 .231.505 0 1.001C9.861 14.767 8.777 15 8 15h-.5v-1h.538a.5.5 0 0 0 .302-.957A1.384 1.384 0 0 0 8.084 12H6.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1.5a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 1 1 0v.5a1.5 1.5 0 0 1-1.5 1.5h-1.5A1.5 1.5 0 0 1 5 14.5v-3A1.5 1.5 0 0 1 6.5 10h1.584a2.5 2.5 0 0 1 2.172 1.384ZM9.898 12.5c.11.164.208.339.295.526.187-.265.368-.595.487-.897.122-.302.2-.584.192-.826-.003-.65-.396-1.006-.903-1.006-.502 0-.898.356-.898 1.006 0 .23.069.513.19.826Z"/>
                  <path d="M14.5 14.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1Zm-2.5-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1ZM12 11.5a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Zm-2 0a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z"/>
                </svg> Usuarios
              </button>
            </Link>
          )}
        </>
      )}
    </nav>
  );
};

export default Navigation;