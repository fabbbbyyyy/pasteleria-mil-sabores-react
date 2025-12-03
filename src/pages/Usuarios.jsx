import React, { useState, useEffect } from 'react'
import UserService from '../services/UserService'

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    try {
      setCargando(true)
      const response = await UserService.getAllUsers()
      console.log('Usuarios cargados:', response.data) // Debug
      setUsuarios(response.data)
      setError(null)
    } catch (err) {
      console.error('Error al cargar usuarios:', err)
      setError('No se pudieron cargar los usuarios. Intenta más tarde.')
    } finally {
      setCargando(false)
    }
  }

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await UserService.deleteUser(id)
        setUsuarios(usuarios.filter(u => u.id !== id))
      } catch (err) {
        console.error('Error al eliminar usuario:', err)
        setError('No se pudo eliminar el usuario.')
      }
    }
  }

  const handleAgregar = () => {
    // Aquí iría la lógica para agregar un nuevo usuario
    alert('Funcionalidad de agregar usuario - Por implementar')
  }

  const getRolNombre = (rolId) => {
    const roles = {
      1: 'Admin',
      2: 'Cliente'
    }
    return roles[rolId] || 'Desconocido'
  }

  return (
    <>
      <section id="centro">
        <div className="content">
          <div id="usuarios-header">
            <h1>Gestión de Usuarios</h1>
            <p>Listado completo de usuarios registrados en el sistema</p>
          </div>

          {error && (
            <div className="error-mensaje">
              <p>{error}</p>
            </div>
          )}

          <div className="usuarios-container">
            {cargando ? (
              <div className="cargando-mensaje">
                <p>Cargando usuarios...</p>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="sin-usuarios-mensaje">
                <p>No hay usuarios registrados</p>
              </div>
            ) : (
              <div className="usuarios-tabla-wrapper">
                <table className="usuarios-tabla">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Dirección</th>
                      <th>Teléfono</th>
                      <th>Rol</th>
                      <th>Método de Pago</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td data-label="ID">{usuario.id}</td>
                        <td data-label="Nombre">{usuario.name}</td>
                        <td data-label="Email">{usuario.mail}</td>
                        <td data-label="Dirección">{usuario.address || '-'}</td>
                        <td data-label="Teléfono">{usuario.number || '-'}</td>
                        <td data-label="Rol">
                          <span className={`badge ${usuario.rol?.id === 1 ? 'badge-admin' : 'badge-cliente'}`}>
                            {getRolNombre(usuario.rol?.id)}
                          </span>
                        </td>
                        <td data-label="Método de Pago">
                          <span className="badge badge-pago">
                            {usuario.paymentMethod?.name || '-'}
                          </span>
                        </td>
                        <td data-label="Acciones">
                          <div className="acciones-tabla">
                            <button 
                              className="btn-eliminar" 
                              title="Eliminar usuario"
                              onClick={() => handleEliminar(usuario.id)}
                            >
                              🗑 Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="usuarios-resumen">
              <div className="resumen-stat">
                <span className="stat-numero">{usuarios.length}</span>
                <span className="stat-label">Total de Usuarios</span>
              </div>
              <button className="btn-agregar-usuario" onClick={handleAgregar}>
                ➕ Agregar Nuevo Usuario
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
