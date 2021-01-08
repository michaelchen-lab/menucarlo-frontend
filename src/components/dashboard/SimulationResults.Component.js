import React from "react"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts"

const SimulationResults = ({statement, baseStats, adjustedStats}) => {
    const results_data = [
        {"name": "Base", "Avg. Daily Profit": parseFloat(baseStats.average_profit.substring(1))},
        {"name": "Adjusted", "Avg. Daily Profit": parseFloat(adjustedStats.average_profit.substring(1))}
    ]
    return (
        <>
            <p className="pl-2 mb-4 text-left border-l-4 border-blue-500">Results</p>
            <p className="px-2 pt-2 pb-6">{statement}</p>
            <ResponsiveContainer height="45%">
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
        </>
    )
}

export default SimulationResults
