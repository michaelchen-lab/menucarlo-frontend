import React from "react"

import SimulationResults from "./SimulationResults.Component"
import TextBoxCard from "./TextBoxCard.Component"
import SimulationHistCard from "./SimulationHistCard.Component"
import TableCard from "./TableCard.Component"

const generateGraphData = (baseData, adjustedData) => {
    let graphData = []
    for (const x of Object.keys(baseData)) {
        graphData.push({name: x, Base: baseData[x], Adjusted: adjustedData[x]})
    }
    return graphData
}

const conditionalCellStyles = [
    {
        when: cell => true,
        style: {
            borderRightWidth: "1.5px",
            borderRightColor: "#3B82F6"
        }
    }
]

const tableColumns = [
    {name: 'Item Name', selector: 'itemName', sortable: true, conditionalCellStyles: conditionalCellStyles},
    {name: 'Total Takings', selector: 'totalTakings', sortable: true},
    {name: 'Cost', selector: 'cost', sortable: true},
    {name: 'Unit Profit', selector: 'unitProfit', sortable: true},
    {name: 'Quantity Sold', selector: 'quantitySold', sortable: true},
    {name: 'Profit', selector: 'profit', sortable: true}
]

const getTableData = (rawData) => {
    let graphData = []
    for (const type of Object.keys(rawData)) {
        for (const item of rawData[type]) {
            graphData.push({
                itemName: item[0], totalTakings: item[1], quantitySold: item[2],
                cost: item[3], profit: item[4], unitProfit: item[5], type: type
            })
        }
    }
    return graphData
}

const SimulationDash = ({data}) => {

    if (!data) return <h1></h1>

    if (!('statement' in data)) return <h1></h1>

    return (
        <div className="grid sm:grid-cols-9 px-4">
            <div className="sm:col-span-5">
                <SimulationResults
                    statement={data.statement}
                    baseStats={data.base} adjustedStats={data.adjusted}
                />
            </div>
            <div className="sm:col-span-4 pl-3">
                <div className="pb-4">
                    <TextBoxCard title="Parameters" texts={data.parameters} />
                </div>
                <TextBoxCard title="Assumptions" texts={data.assumptions} />
            </div>
            <div className="sm:col-span-9 pt-4">
                <SimulationHistCard graphData={generateGraphData(data.base.data, data.adjusted.data)} />
            </div>
        </div>
    )
}

export default SimulationDash

// <div className="sm:col-span-9 pt-4">
//     <TableCard
//         title="Menu Items" columns={tableColumns}
//         data={getTableData(data.table)}
//         filter={{
//             name: "type",
//             options: ["All Items", "Stars", "Plowhorses", "Dogs", "Puzzles"]
//         }}
//         sort={{
//             text: ["cost", "itemName"],
//             number: ["quantitySold"],
//             currency: ["totalTakings", "unitProfit", "profit"]
//         }}
//     />
// </div>
