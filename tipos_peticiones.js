//POST
async function crearUsuario(usuario) {
  const respuesta = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  return await respuesta.json();
}




//PUT
async function actualizarUsuario(id, datos) {
  const respuesta = await fetch(`https://api.example.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  });

  return await respuesta.json();
}


//DELETE
async function borrarUsuario(id) {
  const respuesta = await fetch(`https://api.example.com/users/${id}`, {
    method: "DELETE"
  });

  return respuesta.ok;
}


//ESTOS SON TODOS LOS TIPOS DE PETICIONES MÁS COMUNES