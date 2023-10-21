import React from "react"

export function shortenedText(text) {
    if (text.length > 75) {
        return text.slice(0, 75) + "...";
    }
    return text;
}
