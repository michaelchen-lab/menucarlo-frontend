import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import { DataContext } from "../contexts/Data.Context"
import Sidebar from "./Sidebar.Component.js"
import AnalyticsData from "../data/data.json"

const Dashboard = () => {
    let { name } = useParams()
    const [period, setPeriod] = useState(null)
    const [menu, setMenu] = useState([
        {name: "Analytics", inFocus: true, disabled: false},
        {name: "Simulation", inFocus: false, disabled: false},
    ])
    const [show, setShow] = useState(null)
    const { userData, dispatch } = useContext(DataContext)

    useEffect(() => {
        if (!(name in userData)) {
            dispatch({
                type: "IMPORT_DATA",
                name: name,
                data: AnalyticsData
            })
            // Set a default period to show
            setPeriod(Object.keys(AnalyticsData)[0])
        }
    })

    useEffect(() => {
        for (const item of menu) {
            if (item.inFocus === true) setShow(item.name)
        }
    }, [menu])

    if (!(name in userData)) return <p>Loading</p>

    return (
        <div className="pt-5 grid sm:grid-cols-4 lg:grid-cols-6">
            <div className="sm:col-span-1 lg:col-span-1">
                <Sidebar
                    name={name}
                    allPeriods={Object.keys(userData[name])} setPeriod={setPeriod}
                    menu={menu} setMenu={setMenu}
                />
            </div>
            <div className="sm:col-span-3 lg:col-span-5">
                <p>{show}</p>
                <p>{period}</p>
            </div>
        </div>
    )
}

export default Dashboard
