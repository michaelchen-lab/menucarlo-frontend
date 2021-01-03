import React, { useContext, useState } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

import { AuthContext } from "../contexts/Auth.Context"

const Login = () => {

    const { auth, setAuth } = useContext(AuthContext)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const loginUser = (e) => {
        e.preventDefault()

        console.log('ran')
        axios.post('http://menu-carlo.herokuapp.com/api/accounts/token/', {
            username, password
        }, { headers: {'Content-Type': 'application/json'}})
        .then(res => {
            setAuth({ loading: false, isAuthenticated: true, tokens: res.data })
        })
        .catch(res => {
            console.log('login failed')
        })
    }

    if (auth.isAuthenticated) return (<Redirect to="/" />)

    return (
        <form onSubmit={(e) => loginUser(e)}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Login
