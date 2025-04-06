// services/GetTwelveStepsSummary.js
export async function GetTwelveStepsSummary(token, idModule, idRegularUser = "") {
  const endpoint = `http://localhost:8080/api/v1/summary/twelve-steps?idModule=${idModule}` + 
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
      return data; // Array de { categoryName, average }
    } else {
      const errorData = await response.json();
      console.error("Error en GetTwelveStepsSummary:", errorData);
      return [];
    }
  } catch (error) {
    console.error("Error en la solicitud GetTwelveStepsSummary:", error);
    return [];
  }
}
