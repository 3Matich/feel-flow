import { host } from "@/configs";
import { getAuthData } from "@/services/session";

export async function GetKudosSummary(idModule, idRegularUser = "") {
  console.log("Modulo: " + idModule)
  const endpoint = `${host}/api/v1/summary/kudos?idModule=${idModule}` +
    (idRegularUser ? `&idRegularUser=${idRegularUser}` : "");

  const { token } = getAuthData();
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
