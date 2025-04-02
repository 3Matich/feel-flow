export async function updateUser(name, surname, username, country, phoneNumber, description) {
  const changes = { name, surname, username, country, phoneNumber, description };
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userID');
  console.log("Token que tiene en UpdateUser:", token);
  console.log("Id que tiene en UpdateUser:", userId);
  console.log("El body que se envía es:", changes);

  const url = `http://localhost:8080/api/v1/user/${userId}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changes),
    });

    if (response.ok) {
      return true; // Devuelve true si la actualización fue exitosa
      //   } else if (response.status === 403) {
      //     window.location.href = '/sign-in'; // Redirige al login en caso de 403
      //     return false;
    } else {
      console.error(`Error en la actualización: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error('Error en la actualización:', error);
    return false;
  }
}
