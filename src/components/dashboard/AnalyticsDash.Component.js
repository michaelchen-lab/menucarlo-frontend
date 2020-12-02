import React from "react"

import TextCard from "./TextCard.Component"
import LineGraphCard from "./LineGraphCard.Component"

const generateGraphData = (rawData) => {
    let graphData = []
    for (const x of Object.keys(rawData)) {
        graphData.push({x: x, Revenue: rawData[x]})
    }
    return graphData
}

const AnalyticsDash = ({data}) => {

    return (
        <div className="grid sm:grid-cols-4 px-4">
            {Object.keys(data.all.text).map(title => (
                <div className="pb-4 sm:col-span-1" key={title}>
                    <TextCard title={title} value={data.all.text[title]} />
                </div>
            ))}
            {Object.keys(data.all.graph).map(title => (
                <div className="py-4 sm:col-span-4" key={title}>
                    <LineGraphCard title={title} graphData={generateGraphData(data.all.graph[title])} />
                </div>
            ))}
        </div>
    )
}

export default AnalyticsDash
