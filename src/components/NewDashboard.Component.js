import React, { useContext, useState, useEffect } from "react"
import axios from "axios"

import { AuthContext } from "../contexts/Auth.Context"
import Sidebar from "./Sidebar.Component.js"
import AnalyticsDash from "./dashboard/AnalyticsDash.Component"
import SimulationDash from "./dashboard/SimulationDash.Component"

import simulationData from "../data/simulation.json"

const NewDashboard = () => {
    const { getAccessToken } = useContext(AuthContext)
    const [name, setName] = useState(false)
    const [option, setOption] = useState(false)
    const [period, setPeriod] = useState(false)
    const [allPeriods, setAllPeriods] = useState(false)
    const [periodData, setPeriodData] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAccessToken().then((accessToken) => {
            axios.get('https://menu-carlo.herokuapp.com/api/core/name/', {
                headers: {'Authorization': 'Bearer '+accessToken},
            })
            .then(res => {
                setName(res.data)
            })
        })
    }, [getAccessToken])

    useEffect(() => {
        getAccessToken().then((accessToken) => {
            axios.get('https://menu-carlo.herokuapp.com/api/core/periods/', {
                headers: {'Authorization': 'Bearer '+accessToken},
            })
            .then(res => {
                setAllPeriods(res.data.analytics)
            })
        })
    }, [getAccessToken])

    useEffect(() => {
        // Set initial period and option based on allOptions
        if (allPeriods) {
            setPeriod(Math.max(...allPeriods))
            setOption('analytics')
        }
    }, [allPeriods])

    useEffect(() => {
        setIsLoading(true)
        // works because there is no simulations data right now
        if (period) {
            if (option === 'analytics') {
                getAccessToken().then((accessToken) => {
                    axios.get('https://menu-carlo.herokuapp.com/api/core/analytics/', {
                        headers: {'Authorization': 'Bearer '+accessToken},
                        params: { year: period }
                    })
                    .then(res => {
                        setIsLoading(false)
                        setPeriodData(res.data)
                    })
                })
            } else {
                setIsLoading(false)
                setPeriodData(simulationData)
            }
        }
    }, [period, option, getAccessToken])

    // if (isLoading) <Loader type="Bars" color="rgba(59, 130, 246)" height={80} width={100} />

    return (
        <div className="pt-5 grid sm:grid-cols-4 lg:grid-cols-6">
            <div className="sm:col-span-1 lg:col-span-1">
                <Sidebar
                    name={name}
                    allPeriods={allPeriods} currentPeriod={period} setPeriod={setPeriod}
                    currentOption={option} setOption={setOption} isLoading={isLoading}
                />
            </div>
            <div className="sm:col-span-3 lg:col-span-5">
                {(option === "analytics") ? (
                    <AnalyticsDash data={periodData} />
                ) :
                    <SimulationDash data={periodData} />
                }
            </div>
        </div>
    )
}

export default NewDashboard
