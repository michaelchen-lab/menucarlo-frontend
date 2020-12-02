import React from "react"
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts"

const LineGraphCard = ({title, graphData}) => {
    let graphAspect = 6
    if (window.innerWidth < 640) graphAspect = 2
    console.log(graphAspect)

    return (
        <>
            <p className="pl-2 mb-4 text-left border-l-4 border-blue-500">{title}</p>
            <ResponsiveContainer aspect={graphAspect} width="100%" height="100%">
                <AreaChart data={graphData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis tick={{dx: -15}} tickFormatter={(num) => "$"+num}/>
                    <Tooltip />
                    <Area
                        type="monotone" dataKey="Revenue" isAnimationActive={true}
                        stroke="#3B82F6" strokeWidth={1.5} fill="#BFDBFE" />
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}

export default LineGraphCard
