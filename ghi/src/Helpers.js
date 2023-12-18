import React from "react"

export function shortenedText(text) {
    if (text.length > 75) {
        return text.slice(0, 75) + "...";
    }
    return text;
}

export function adjustFontSize() {
    const textMeasure = document.querySelector('.cd-measure');
    const textElement = document.querySelector('.cd-title');
    const containerElement = document.querySelector('.cd-title-container');
    if (textElement && containerElement) {
        const textWidth = textMeasure.scrollWidth;
        const containerWidth = containerElement.offsetWidth;
        console.log(textWidth, containerWidth)
        if (textWidth > containerWidth) {
            const fontSize = 37;
            textElement.style.fontSize = fontSize + 'px';
        } else {
            const fontSize = 45;
            textElement.style.fontSize = fontSize + 'px';
        }
    }
}

export function returnScroll() {
    window.addEventListener('beforeunload', function (event) {
        // Perform actions when leaving the page
        // For example, you can show a confirmation message
        event.preventDefault(); // For some browsers to work properly
        document.body.style.overflow = 'auto';
    });
}

// useEffect(() => {
//     adjustFontSize();
//     window.addEventListener('resize', adjustFontSize);

//     return () => {
//         window.removeEventListener('resize', adjustFontSize);
//     };
// }, []);
