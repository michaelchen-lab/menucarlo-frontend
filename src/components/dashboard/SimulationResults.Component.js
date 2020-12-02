import React, { useRef } from "react"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts"

// const CustomBar = (props) => {
//     const {name, fill} = props;
//     //business logic here to update fill color explicitly
//     console.log(name)
//
//     //use explicit fill here, or use the additional css class and make a css selector to update fill there
//     return <Rectangle {...props} fill="#60A5FA" className={"recharts-bar-rectangle "+name} />
// };

const SimulationResults = ({statement, baseStats, adjustedStats}) => {
    const targetRef = useRef()
    const results_data = [
        {"name": "Base", "Avg. Daily Profit": parseFloat(baseStats.average_profit.substring(1))},
        {"name": "Adjusted", "Avg. Daily Profit": parseFloat(adjustedStats.average_profit.substring(1))}
    ]
    let graphAspect = 5
    let barHeight = "55%"
    if (window.innerWidth < 640) {
        graphAspect = 2
        barHeight = "40%"
    } else if (window.innerWidth < 1200) barHeight = "40%"
    else if (window.innerWidth < 1600) barHeight = "45%"
    console.log(graphAspect)
    // Note: ResponsiveContainer does not work well with horizontal bar charts. Try height=100%
    //       to test the problem. The workaround is to adjust height percentage for different
    //       screen sizes. Ugly, but still kinda works.

    return (
        <>
            <p className="pl-2 mb-4 text-left border-l-4 border-blue-500">Results</p>
            <ResponsiveContainer aspect={graphAspect} height={barHeight}>
                <BarChart
                    data={results_data} layout="vertical"
                    margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
                >
                    <XAxis type="number" tickFormatter={(num) => "$"+num}/>
                    <YAxis type="category" dataKey="name"/>
                    <Tooltip
                        formatter={(value,name,props) => "$"+value.toString()}
                        labelFormatter={(x) => ""}
                    />

                    <Bar dataKey="Avg. Daily Profit" maxBarSize={25}>
                        {
                            results_data.map((entry, index) => (
                                <Cell fill={results_data[index].name === "Base" ? '#60A5FA' : '#2563EB' } key={index}/>
                            ))
                        }
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
            <p className="px-2 py-2">{statement}</p>
        </>
    )
}

export default SimulationResults
