// services/uploadUserImage.js

export async function uploadUserImage(base64Image) {
    try {
      const token = sessionStorage.getItem("token");
  
      const response = await fetch("/api/v1/images/user/current_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageFile: base64Image }),
      });
  
      if (!response.ok) {
        throw new Error("No se pudo subir la imagen");
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error al subir la imagen:", err);
      throw err;
    }
  }
  