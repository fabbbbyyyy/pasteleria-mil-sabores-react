import React from "react";
import { useNavigate } from "react-router-dom";
import { usePerfil } from "../hooks/usePerfil";
import { useAuth } from "../hooks/useAuth";

export default function Perfil() {
  const {
    perfil,
    editando,
    errores,
    metodosDePago,
    handleChange,
    handleGuardar,
    setEditando,
  } = usePerfil();
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section id="centro">
      <main id="perfil">
        <h1>Mi Perfil</h1>

        <div className="perfil-info">
          {editando ? (
            <>
              <p>
                <strong>Nombre:</strong>{" "}
                <input
                  type="text"
                  name="nombre"
                  value={perfil.nombre}
                  onChange={handleChange}
                />
                {errores.nombre && <div className="error">{errores.nombre}</div>}
              </p>

              <p>
                <strong>Correo electrónico:</strong>{" "}
                <input
                  type="email"
                  name="correo"
                  value={perfil.correo}
                  onChange={handleChange}
                />
                {errores.correo && <div className="error">{errores.correo}</div>}
              </p>

              <p>
                <strong>Teléfono:</strong>{" "}
                <input
                  type="text"
                  name="telefono"
                  value={perfil.telefono}
                  onChange={handleChange}
                />
                {errores.telefono && <div className="error">{errores.telefono}</div>}
              </p>

              <p>
                <strong>Dirección:</strong>{" "}
                <input
                  type="text"
                  name="direccion"
                  value={perfil.direccion}
                  onChange={handleChange}
                />
                {errores.direccion && <div className="error">{errores.direccion}</div>}
              </p>

              <p>
                <strong>Método de pago preferido:</strong>{" "}
                <select
                  name="metodoPago"
                  value={perfil.metodoPago}
                  onChange={handleChange}
                >
                  {metodosDePago.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
                {errores.metodoPago && <div className="error">{errores.metodoPago}</div>}
              </p>
            </>
          ) : (
            <>
              <p><strong>Nombre:</strong> {perfil.nombre}</p>
              <p><strong>Correo electrónico:</strong> {perfil.correo}</p>
              <p><strong>Teléfono:</strong> {perfil.telefono}</p>
              <p><strong>Dirección:</strong> {perfil.direccion}</p>
              <p><strong>Método de pago preferido:</strong> {perfil.metodoPago}</p>
            </>
          )}
        </div>

        <div className="perfil-actions">
          {editando ? (
            <button className="btn-cta" onClick={handleGuardar}>
              Guardar
            </button>
          ) : (
            <button className="btn-cta" onClick={() => setEditando(true)}>
              Editar Perfil
            </button>
          )}
          <button className="btn-cta" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </main>
    </section>
  );
}
