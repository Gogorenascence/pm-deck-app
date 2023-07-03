import React, { useEffect, useState } from "react";

function LightSwitch() {
    const [isDark, setIsDark] = useState(false);

    const handleDark = (event) => {
        setIsDark(!isDark);
    }

    useEffect(() => {
        // Retrieve the dark mode state from local storage
        const savedDarkMode = localStorage.getItem("darkMode");

        // If the dark mode state exists in local storage, use it to set the initial state
        if (savedDarkMode) {
            setIsDark(JSON.parse(savedDarkMode));
            document.body.classList.toggle("dark", JSON.parse(savedDarkMode));
        }
    }, []);

    useEffect(() => {
        // Update the dark mode state in local storage whenever it changes
        localStorage.setItem("darkMode", JSON.stringify(isDark));

        document.body.classList.toggle("dark", isDark);
    }, [isDark]);

    return (
        <div>
            {isDark?
                <img
                    className="light-dark"
                    src="https://i.imgur.com/bL1Lcll.png"
                    alt="light"
                    onClick={handleDark}/>
                :
                <img
                    className="light-dark"
                    src="https://i.imgur.com/aC79zoE.png"
                    alt="dark"
                    onClick={handleDark}/>
            }
        </div>

);
}

export default LightSwitch;
