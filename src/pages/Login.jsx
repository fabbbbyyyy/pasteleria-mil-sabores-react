import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar error previo
    setError("");

    // Deshabilitar el botón
    setIsSubmitting(true);

    // Intentar login (las validaciones están en useAuth)
    const result = await login(email, password);

    if (result.success) {
      // Redirigir al home o perfil
      navigate("/");
    } else {
      setError(result.message || "Error al iniciar sesión");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="centro">
    <section id="perfil">
      <h1>Iniciar Sesión</h1>

      <form className="perfil-info" onSubmit={handleSubmit}>
        <div>
          <strong>Correo electrónico</strong>
          <input
            type="email"
            name="correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>

        <div>
          <strong>Contraseña</strong>
          <input
            type="password"
            name="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>

        {error && <span className="error">{error}</span>}

        <div className="registro-actions">
          <button className="btn-cta" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </form>

      <p>
        ¿No tienes una cuenta?{" "}
        <a href="/registro">
          Regístrate
        </a>
      </p>
    </section>
    </section>
  );
};

export default Login;