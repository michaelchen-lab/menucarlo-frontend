import React, { useContext, useState } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import Loader from 'react-loader-spinner'

import { AuthContext } from "../contexts/Auth.Context"

const Login = () => {

    const { auth, setAuth } = useContext(AuthContext)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const loginUser = (e) => {
        e.preventDefault()
        setAuth({...auth, loading: true})

        console.log('ran')
        axios.post('https://menu-carlo.herokuapp.com/api/accounts/token/', {
            username, password
        }, { headers: {'Content-Type': 'application/json'}})
        .then(res => {
            setAuth({ loading: false, isAuthenticated: true, tokens: res.data })
        })
        .catch(res => {
            console.log('login failed')
        })
    }

    if (auth.loading) return (
        <div className="py-4 px-4">
            <Loader type="TailSpin" color="rgba(59, 130, 246)" height={50} width={50} />
        </div>
    )

    if (auth.isAuthenticated) return (<Redirect to="/" />)

    return (

        <div class="flex items-center justify-center h-screen bg-blue-200">
    		<div class="w-full max-w-xs">
    			<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={loginUser}>
    				<h1 class="font-bold text-blue-500 text-xl text-center mb-3">MenuCarlo</h1>

    				<div class="mb-4">
    					<label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
                            Username
    					</label>
    					<input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={e => setUsername(e.target.value)} name="username" type="text"
                        />
    				</div>
    				<div class="mb-4">
    					<label class="block text-gray-700 text-sm font-semibold mb-2" for="password">
    						Password
    					</label>
    					<input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={e => setPassword(e.target.value)} name="password" type="password"
                        />
    				</div>
    				<div class="flex items-center justify-between">
    					<button class="border border-blue-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
    						Sign In
    					</button>
                        <button
                            className="text-blue-500 border border-blue-500 rounded hover:border-blue-700 hover:text-blue-700 text-white font-bold py-2 px-4" disabled>
                            Register
                        </button>
    				</div>
    			</form>
    		</div>
    	</div>
    )
}

export default Login
