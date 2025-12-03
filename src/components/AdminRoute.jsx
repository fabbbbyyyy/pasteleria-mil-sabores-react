import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Mostrar loading mientras verifica la autenticación
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si no es admin (roleId != 1), redirigir al home
  if (user?.roleId !== 1) {
    return <Navigate to="/" replace />;
  }

  // Si es admin, mostrar el componente
  return children;
};

export default AdminRoute;
