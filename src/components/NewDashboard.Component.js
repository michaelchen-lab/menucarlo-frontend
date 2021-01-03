import React, { useContext, useState, useEffect } from "react"
import axios from "axios"

import { AuthContext } from "../contexts/Auth.Context"

const NewDashboard = () => {
    const { auth, getAccessToken } = useContext(AuthContext)
    const [period, setPeriod] = useState(2020)
    const [periodData, setPeriodData] = useState()

    useEffect(() => {
        getAccessToken().then((accessToken) => {
            axios.get('http://menu-carlo.herokuapp.com/api/core/analytics/', {
                headers: {'Authorization': 'Bearer '+accessToken},
                params: { year: period }
            })
            .then(res => {
                setPeriodData(res.data)
            })
        })
    }, [period])

    if (!periodData) <h1>Loading...</h1>

    return (
        <h1>{JSON.stringify(periodData)}</h1>
    )
}

export default NewDashboard
