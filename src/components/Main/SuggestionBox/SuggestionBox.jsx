import { useEffect, useState } from "react";
import "./SuggestionBox.css"
import { keywords as javaKeyword } from "./javaKeywords";
import { keywords as cppKeyword } from "./cppKeywords";
import { keywords as pythonKeyword } from "./pythonKeywords";
function SuggestionBox({ mode = "java", currObj = "", currProp = "", position = {}, handleSuggestionSelection }) {
    const [noMatchingSuggestions, setNoMatchingSuggestions] = useState(true);
    const [suggestions, setSuggestions] = useState([
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
        console.log(mode)
        if (mode == "java") {
            setSuggestions(javaKeyword);
        }
        else if (mode == "cpp") {
            setSuggestions(cppKeyword);
        }
        else if (mode == "py") {
            setSuggestions(pythonKeyword);
        }

        // console.log("suggestion box obj", currObj);
        // console.log("suggestion box prop", currProp);
    }, [currProp])
    return (
        <>
            <div id="suggestion-box" style={position}>
                <ul>
                    {
                        suggestions.length > 0 ?
                            suggestions.map((value) => (

                                value.name.includes(currProp) ?
                                    (<div className="flex space-between cursor-pointer" key={value.name} onClick={() => (handleSuggestionSelection(value.name))}>
                                        <div style={{ color: 'red', fontWeight: 'bold' }}>{value.name}</div>
                                        <div style={{ color: 'skyblue' }}>{value.type}</div>
                                    </div>) : null
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