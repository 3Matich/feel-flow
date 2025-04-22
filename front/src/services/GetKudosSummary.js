// services/GetKudosSummary.js
export async function GetKudosSummary(token, idModule, idRegularUser = "") {
  const endpoint = `http://localhost:8080/api/v1/summary/kudos?idModule=${idModule}` + 
                   (idRegularUser ? `&idRegularUser=${idRegularUser}` : "");
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log("GetKudosSummary Success: ", data);  // Log para ver la data
      return data; // Array de { badgeName, numberOfBadges }
    } else {
      const errorData = await response.json();
      console.error("Error en GetKudosSummary:", errorData);
      return [];
    }
  } catch (error) {
    console.error("Error en la solicitud GetKudosSummary:", error);
    return [];
  }
}
