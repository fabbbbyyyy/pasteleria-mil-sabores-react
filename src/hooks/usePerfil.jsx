import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import UserService from "../services/UserService";
import PaymentMethodService from "../services/PaymentMethodService";

export const usePerfil = () => {
  const { user, logout, updateUser } = useAuth();
  const [perfil, setPerfil] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    metodoPago: "",
  });
  const [editando, setEditando] = useState(false);
  const [errores, setErrores] = useState({});
  const [metodosDePago, setMetodosDePago] = useState([]);
  const [metodosDePagoCompletos, setMetodosDePagoCompletos] = useState([]); // Guardar objetos completos
  const [loading, setLoading] = useState(false);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    if (user) {
      setPerfil({
        nombre: user.name || "",
        correo: user.email || "",
        telefono: user.number || "",
        direccion: user.address || "",
        metodoPago: user.paymentMethod || "",
      });
    }
  }, [user]);

  // Cargar métodos de pago disponibles
  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const response = await PaymentMethodService.getAllPaymentMethods();
        // Guardar los objetos completos
        setMetodosDePagoCompletos(response.data);
        // Guardar solo los nombres para el select
        const methods = response.data.map(method => method.name || method.type || `Método ${method.id}`);
        setMetodosDePago(methods);
      } catch (error) {
        console.error("Error al cargar métodos de pago:", error);
      }
    };
    loadPaymentMethods();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo modificado
    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validar formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!perfil.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!perfil.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(perfil.correo)) {
        nuevosErrores.correo = "El correo no es válido";
      }
    }

    if (!perfil.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    }

    if (!perfil.direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria";
    }

    if (!perfil.metodoPago) {
      nuevosErrores.metodoPago = "Selecciona un método de pago";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para actualizar el perfil del usuario
  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await UserService.updateUser(user.id, userData);


      // Actualizar el usuario en el estado global y localStorage
      // El backend devuelve el usuario actualizado
      const updatedUser = { 
        ...user, 
        name: response.data.name || userData.name,
        email: response.data.mail || userData.mail, // ✅ El backend usa 'mail'
        number: response.data.number || userData.number,
        address: response.data.address || userData.address,
        paymentMethod: response.data.paymentMethod?.name || userData.paymentMethod?.name,
        id: user.id
      };
      
      updateUser(updatedUser);

      return response.data;
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      if (error.response?.status === 401) {
        logout(); // Cerrar sesión si el token es inválido
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Guardar cambios del perfil
  const handleGuardar = async () => {
    if (!validarFormulario()) {
      return;
    }

    try {
      // Buscar el ID del método de pago seleccionado
      const metodoPagoSeleccionado = metodosDePagoCompletos.find(
        method => (method.name || method.type || `Método ${method.id}`) === perfil.metodoPago
      );

      if (!metodoPagoSeleccionado) {
        alert("Error: Método de pago no válido");
        return;
      }

      // Preparar datos para enviar al backend según el formato esperado
      const userData = {
        name: perfil.nombre,
        mail: perfil.correo,
        number: perfil.telefono,
        address: perfil.direccion,
        paymentMethod: {
          id: metodoPagoSeleccionado.id,
          name: metodoPagoSeleccionado.name || metodoPagoSeleccionado.type || `Método ${metodoPagoSeleccionado.id}`
        }
      };

      await updateUserProfile(userData);

      // Salir del modo edición
      setEditando(false);
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al actualizar el perfil";
      alert(errorMessage);
      console.error("Detalles del error:", error.response?.data);
    }
  };

  return {
    perfil,
    editando,
    errores,
    metodosDePago,
    loading,
    handleChange,
    handleGuardar,
    setEditando,
  };
};
