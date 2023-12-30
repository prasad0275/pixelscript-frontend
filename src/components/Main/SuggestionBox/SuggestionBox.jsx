import { useEffect, useState } from "react";
import "./SuggestionBox.css"
function SuggestionBox({ currObj = "", currProp = "", position = {}, handleSuggestionSelection }) {
    const [noMatchingSuggestions, setNoMatchingSuggestions] = useState(true);
    const [suggestions, setSuggestionPosition] = useState([
        {
            "modifier": "public ",
            "type": "String",
            "name": "name"
        },
        {
            "modifier": "public ",
            "type": "String",
            "name": "type"
        },
        {
            "modifier": "public ",
            "type": "String",
            "name": "legs"
        },
        {
            "modifier": "public",
            "type": "boolean",
            "name": "canFly"
        },
        {
            "modifier": "public",
            "type": "boolean",
            "name": "canRun"
        },
        {
            "modifier": "public",
            "type": "boolean",
            "name": "canSwim"
        }
    ])

    useEffect(() => {

        console.log("suggestion box obj", currObj);
        console.log("suggestion box prop", currProp);
    }, [currProp])
    return (
        <>
            <div id="suggestion-box" style={position}>
                <ul>
                    {
                        suggestions.length > 0 ?
                            suggestions.map((value) => (

                                value.name.includes(currProp) ?
                                    (<li key={value.name} onClick={() => (handleSuggestionSelection(value.name))}>{value.name}</li>) : null
                                // if(value.name.includes(currProp)){
                                
                                
                            ))
                            :
                            <li>No suggestions found</li>
                    }
                </ul>
            </div>
        </>
    )
}

export default SuggestionBox;