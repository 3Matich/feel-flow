import { useState, useCallback } from "react";

export function useDragAndDrop() {
    const [logoPreview, setLogoPreview] = useState(null);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    }, []);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    }, []);

    const handleRemoveImage = useCallback(() => {
        setLogoPreview(null);
    }, []);

    return { handleDragOver, handleDrop, handleImageChange, handleRemoveImage, logoPreview };
}
