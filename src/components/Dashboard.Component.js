import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import { DataContext } from "../contexts/Data.Context"
import Sidebar from "./Sidebar.Component.js"
import AnalyticsDash from "./dashboard/AnalyticsDash.Component"
import SimulationDash from "./dashboard/SimulationDash.Component"

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

    // Import Data: Similar to componentDidMount
    useEffect(() => {
        if (!(name in userData)) {
            console.log('run initial useEffect')
            console.log(name)
            dispatch({
                type: "IMPORT_DATA",
                name: name,
                data: AnalyticsData
            })
        }
    })

    // Set a default period to show
    useEffect(() => {
        if (Object.keys(userData).length === 0) return
        setPeriod(Object.keys(userData[name])[0])
    }, [userData])

    // Change "show" state when the menu is updated by sidebar
    useEffect(() => {
        for (const item of menu) {
            if (item.inFocus === true) setShow(item.name)
        }
    }, [menu])

    // When period is changed by user, unavailable menu items must be disabled.
    useEffect(() => {
        if (Object.keys(userData).length === 0) return

        let newMenu = [...menu]
        for (const item of newMenu) {
            console.log(userData)
            if (Object.keys(userData[name][period][item.name.toLowerCase()]).length === 0) item.disabled = true
            else item.disabled = false
        }
        console.log(newMenu)
        setMenu(newMenu)
    }, [period])

    if (!(name in userData) || (period === null)) return <p>Loading</p>

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
                {(show === "Analytics") ? (
                    <AnalyticsDash data={userData[name][period].analytics} />
                ) : <SimulationDash data={userData[name][period].simulation} />}
            </div>
        </div>
    )
}

export default Dashboard
