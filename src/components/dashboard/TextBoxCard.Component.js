import React from "react"

const TextBoxCard = ({title, texts}) => {
    return (
        <div>
            <p className="pl-2 mb-2 text-left border-l-4 border-blue-500">{title}</p>
            <ul className="list-disc list-inside pl-3">
                {texts.map(text => <li key={text}>{text}</li>)}
            </ul>
        </div>
    )
}

export default TextBoxCard
