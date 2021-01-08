import React from "react"
import Loader from 'react-loader-spinner'

import TextCard from "./TextCard.Component"
import LineGraphCard from "./LineGraphCard.Component"
import ScatterGraphCard from "./ScatterGraphCard.Component"
import TableCard from "./TableCard.Component"

const generateGraphData = (rawData) => {
    let graphData = []
    for (const x of Object.keys(rawData)) {
        graphData.push({x: x, Revenue: rawData[x]})
    }
    return graphData
}

const AnalyticsDash = ({data}) => {

    if (!data) return <h1></h1>

    if (!('graph' in data)) return <h1></h1>

    // WORKAROUND: Reorder Revenue by Month properly
    const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let newRevByMonth = {}
    for (const month of monthsOrder) {
        newRevByMonth[month] = data.graph['Revenue By Month'][month]
    }
    data.graph['Revenue By Month'] = newRevByMonth

    // <ScatterGraphCard graphData={data.items} />

    return (
        <div className="grid sm:grid-cols-4 px-4">
            {Object.keys(data.text).map(title => (
                <div className="pb-4 sm:col-span-1" key={title}>
                    <TextCard title={title} value={data.text[title]} />
                </div>
            ))}
            {Object.keys(data.graph).map(title => (
                <div className="py-4 sm:col-span-4" key={title}>
                    <LineGraphCard title={title} graphData={generateGraphData(data.graph[title])} />
                </div>
            ))}
            <div className="sm:col-span-4 justify-center">
                <div className="">
                <ScatterGraphCard graphData={data.items} />
                </div>
            </div>
        </div>
    )
}

export default AnalyticsDash
