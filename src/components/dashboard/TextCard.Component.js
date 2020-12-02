import React from "react"

const TextCard = ({title, value}) => {
    return (
        <>
            <p className="pl-2 mb-4 text-left border-l-4 border-blue-500">{title}</p>
            <p className="text-center font-semibold text-xl">{value}</p>
        </>
    )
}

export default TextCard
