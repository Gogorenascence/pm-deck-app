import React, { useEffect, useState } from "react";

function LightSwitch() {
    const [isDark, setIsDark] = useState(false);

    const handleDark = (event) => {
        setIsDark(!isDark);
        console.log(isDark)
    }

    useEffect(() => {
        // const queries = ".centered-h5, .centered-h5-2"
        // const elements = document.querySelectorAll(queries);
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }


        // if (isDark) {
        //     elements.forEach((element) => {
        //         element.classList.add("dark");
        //     });
        // } else {
        //     elements.forEach((element) => {
        //         element.classList.remove("dark");
        //     });
        // }
        }, [isDark]);

    return (
        <div>
            { isDark?
                <>
                    <img
                        className="light-dark"
                        src="https://i.imgur.com/bL1Lcll.png"
                        alt="light"
                        onClick={handleDark}>
                    </img>
                </> :
                <>
                    <img
                        className="light-dark"
                        src="https://i.imgur.com/aC79zoE.png"
                        alt="dark"
                        onClick={handleDark}>
                    </img>
                </>
            }
        </div>

);
}

export default LightSwitch;
