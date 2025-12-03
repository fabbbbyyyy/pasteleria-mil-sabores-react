import React from 'react'

export default function Usuarios() {
  // Datos de ejemplo de usuarios (según el modelo del backend)
  const usuarios = [
    {
      id: 1,
      name: 'Juan Pérez',
      mail: 'juan.perez@email.com',
      address: 'Calle Principal 123',
      number: '+56 9 1234 5678',
      paymentMethod: { id: 1, name: 'Tarjeta Crédito' }
    },
    {
      id: 2,
      name: 'María García',
      mail: 'maria.garcia@email.com',
      address: 'Avenida Central 456',
      number: '+56 9 2345 6789',
      paymentMethod: { id: 2, name: 'Transferencia' }
    },
    {
      id: 3,
      name: 'Carlos López',
      mail: 'carlos.lopez@email.com',
      address: 'Pasaje Sur 789',
      number: '+56 9 3456 7890',
      paymentMethod: { id: 1, name: 'Tarjeta Crédito' }
    },
    {
      id: 4,
      name: 'Ana Martínez',
      mail: 'ana.martinez@email.com',
      address: 'Calle Oriente 321',
      number: '+56 9 4567 8901',
      paymentMethod: { id: 3, name: 'PayPal' }
    },
    {
      id: 5,
      name: 'Roberto Sánchez',
      mail: 'roberto.sanchez@email.com',
      address: 'Boulevard Poniente 654',
      number: '+56 9 5678 9012',
      paymentMethod: { id: 2, name: 'Transferencia' }
    },
    {
      id: 6,
      name: 'Sofía Rodríguez',
      mail: 'sofia.rodriguez@email.com',
      address: 'Camino Antiguo 987',
      number: '+56 9 6789 0123',
      paymentMethod: { id: 1, name: 'Tarjeta Crédito' }
    },
    {
      id: 7,
      name: 'Diego Flores',
      mail: 'diego.flores@email.com',
      address: 'Pasaje Norte 147',
      number: '+56 9 7890 1234',
      paymentMethod: { id: 3, name: 'PayPal' }
    },
    {
      id: 8,
      name: 'Claudia Morales',
      mail: 'claudia.morales@email.com',
      address: 'Avenida Este 258',
      number: '+56 9 8901 2345',
      paymentMethod: { id: 2, name: 'Transferencia' }
    }
  ]

  return (
    <>
      <section id="centro">
        <div className="content">
          <div id="usuarios-header">
            <h1>Gestión de Usuarios</h1>
            <p>Listado completo de usuarios registrados en el sistema</p>
          </div>

          <div className="usuarios-container">
            <div className="usuarios-tabla-wrapper">
              <table className="usuarios-tabla">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
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
                      <td data-label="Dirección">{usuario.address}</td>
                      <td data-label="Teléfono">{usuario.number}</td>
                      <td data-label="Método de Pago">
                        <span className="badge badge-pago">
                          {usuario.paymentMethod.name}
                        </span>
                      </td>
                      <td data-label="Acciones">
                        <div className="acciones-tabla">
                          <button className="btn-editar" title="Editar usuario">
                            ✎ Editar
                          </button>
                          <button className="btn-eliminar" title="Eliminar usuario">
                            🗑 Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="usuarios-resumen">
              <div className="resumen-stat">
                <span className="stat-numero">{usuarios.length}</span>
                <span className="stat-label">Total de Usuarios</span>
              </div>
              <button className="btn-agregar-usuario">
                ➕ Agregar Nuevo Usuario
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
