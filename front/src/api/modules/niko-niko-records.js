import { host } from "@/configs";
import { getAuthData } from "@/api";

export async function GetNotificationsNikoNiko () {
    const url = `${host}/api/v1/dashboard/notification_niko_niko_panel`
    const { token } = getAuthData();
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data; 
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        return [];
      }
}