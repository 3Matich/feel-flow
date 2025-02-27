export async function crearModulo(token, idTeam, idPoolQuestion, dateAndTimeToPublish, dateAndTimeToClose) {
    const endpoint = `http://localhost:8080/api/v1/twelve_steps_modules`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "idTeam": idTeam,
              "idPoolQuestion": idPoolQuestion, 
              "dateAndTimeToPublish": dateAndTimeToPublish,
              "dateAndTimeToClose": dateAndTimeToClose, 
            }),
          });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);
            return data.statusMsg; // Assuming this is the success message
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.errorMessage);
            return errorData.errorMessage;
        }
    } catch (error) {
        console.error('Error during the request:', error);
        return 'Error al realizar la solicitud';
    }
}
