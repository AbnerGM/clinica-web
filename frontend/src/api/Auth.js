export async function loginUsuario(username, password) {
  const response = await fetch("http://localhost:9000/clinicaWeb/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  const data = await response.json();

  // Opcional: guardar en localStorage o tambien retornarLA
  return {
    id: data.idUsuario,
    username: data.username,
    rol: data.rol,
    mensaje: data.mensaje,
  };
}
