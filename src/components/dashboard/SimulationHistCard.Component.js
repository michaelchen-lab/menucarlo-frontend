import React from "react"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"

const SimulationHistCard = ({graphData}) => {
    let graphAspect = 3
    if (window.innerWidth < 640) graphAspect = 2
    console.log(graphAspect)

    return (
        <>
            <p className="pl-2 mb-4 text-left border-l-4 border-blue-500">Distribution of Daily Profit</p>
            <ResponsiveContainer aspect={graphAspect} width="100%" height="100%">
                <BarChart data={graphData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tick={{dx: -15}}/>
                    <Tooltip />
                    <Legend align="right" />
                    <Bar dataKey="Base" fill="#60A5FA" />
                    <Bar dataKey="Adjusted" fill="#2563EB" />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default SimulationHistCard
