// services/GetModulesAndUsers.js
import { host } from "@/configs";
import { getAuthData, getUserData } from "@/api";

export async function GetModulesAndUsers(nameModule = "TWELVE_STEPS") {
  const { token } = getAuthData();
  const { isAdmin } = getUserData();
  // const admin = sessionStorage.getItem("isAdmin")
  const endpoint = `${host}/api/v1/dashboard/modules-and-users?nameModule=${nameModule}&isAdmin=${isAdmin}`;

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
      // data: [ { moduleDto, usersDto }, { moduleDto, usersDto }, ... ]
      return data;
    } else {
      const errorData = await response.json();
      console.error("Error en GetModulesAndUsers:", errorData);
      return [];
    }
  } catch (error) {
    console.error("Error en la solicitud GetModulesAndUsers:", error);
    return [];
  }
}
