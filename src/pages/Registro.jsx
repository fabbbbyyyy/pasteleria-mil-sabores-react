import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PaymentMethodService from "../services/PaymentMethodService";


const Registro = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [numero, setNumero] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  useEffect(() => {
    console.log("Cargando métodos de pago...");
    PaymentMethodService.getAllPaymentMethods()
      .then((response) => {
        console.log("Métodos de pago recibidos:", response.data);
        setPaymentMethods(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar métodos de pago:", error);
        console.error("Detalles del error:", error.response);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpiar mensajes previos
    setError("");
    setSuccessMessage("");
    
    // Validaciones
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Deshabilitar el botón
    setIsSubmitting(true);

    // Usar la función register de useAuth
    const result = await register(name, mail, password, numero, address, parseInt(paymentMethod));

    if (result.success) {
      setSuccessMessage("¡Cuenta creada exitosamente! Redirigiendo...");
      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        navigate("/"); // Redirigir al home ya que está logueado
      }, 2000);
    } else {
      setError(result.message || "Error al crear la cuenta");
      setIsSubmitting(false); // Rehabilitar el botón en caso de error
    }
  };

  return (
    <section id="centro">
    <section id="perfil">
      <h1>Crear una cuenta</h1>

      <form className="perfil-info" onSubmit={handleSubmit}>
        <div>
          <strong>Nombre completo</strong>
          <input
            type="text"
            name="nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            required
          />
        </div>

        <div>
          <strong>Correo electrónico</strong>
          <input
            type="email"
            name="correo"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
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

        <div>
          <strong>Confirmar contraseña</strong>
          <input
            type="password"
            name="confirmar"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            placeholder="Confirmar contraseña"
            required
          />
        </div>

        <div>
          <strong>Número de teléfono</strong>
          <input
            type="text"
            name="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Número de teléfono"
          />
        </div>

        <div>
          <strong>Dirección</strong>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección"
            required
          />
        </div>

        <div>
          <strong>Método de pago</strong>
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Selecciona un método de pago</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name || method.type || `Método ${method.id}`}
              </option>
            ))}
          </select>
        </div>

        {error && <span className="error">{error}</span>}
        {successMessage && <span className="success">{successMessage}</span>}

        <div className="registro-actions">
          <button className="btn-cta" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </div>
      </form>

      <p >
        ¿Ya tienes cuenta?{" "}
        <a href="#" >
          Inicia sesión
        </a>
      </p>
    </section>
    </section>
  );
};

export default Registro;