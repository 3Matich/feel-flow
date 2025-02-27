export async function crearModulo(token, idTeam, dateAndTimeToPublish, dateAndTimeToClose, timeStartToResponse, timeEndToResponse) {
    const endpoint = `http://localhost:8080/api/v1/niko_niko`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "idTeam": idTeam, 
              "dateAndTimeToPublish": dateAndTimeToPublish,
              "dateAndTimeToClose": dateAndTimeToClose, 
              "timeToToResponseStartDay": timeStartToResponse,
              "timeToToResponseEndDay": timeEndToResponse
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
