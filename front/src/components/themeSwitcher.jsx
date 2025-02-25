import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const [darkMode, setDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <button
            className="p-2 text-blue-gray-500 dark:text-blue-gray-200 rounded"
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
        </button>
    );
}
