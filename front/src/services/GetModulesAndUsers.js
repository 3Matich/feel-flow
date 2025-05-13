// services/GetModulesAndUsers.js
export async function GetModulesAndUsers(token, nameModule = "TWELVE_STEPS", isAdmin = true) {
    const admin = sessionStorage.getItem("isAdmin")
    const endpoint = `http://localhost:8080/api/v1/dashboard/modules-and-users?nameModule=${nameModule}&isAdmin=${admin}`;
  
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
  