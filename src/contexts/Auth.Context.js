import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState({ loading: true, isAuthenticated: false, tokens: null })

    useEffect(() => {
        console.log('starting')
        if (localStorage.getItem('tokens') !== null) {
            const tokens = JSON.parse(localStorage.getItem('tokens'))
            validateRefreshToken(tokens).then((isValid) => {
                if (isValid) {
                    setAuth({
                        loading: false, isAuthenticated: true,
                        tokens: tokens
                    })
                } else {
                    setAuth({loading: false, isAuthenticated: false, tokens: null})
                }
            })
        } else {
            setAuth({loading: false, isAuthenticated: false, tokens: null})
        }
    }, [])

    useEffect(() => {
        if (auth.tokens) localStorage.setItem('tokens', JSON.stringify(auth.tokens))
    }, [auth.tokens])

    const getNewAccessToken = async () => {
        let accessToken = null

        await axios.post('http://menu-carlo.herokuapp.com/api/accounts/token/refresh/', {
            refresh: auth.tokens.refresh
        }, { headers: { "Content-Type": "application/json" } })
        .then(res => {
            console.log('new access token extracted')
            console.log(res.data.access)
            setAuth({...auth, tokens: {
                refresh: auth.tokens.refresh,
                access: res.data.access
            }})

            accessToken = res.data.access
        })

        return accessToken
    }

    const validateRefreshToken = async (tokens) => {
        let isValid = null

        await axios.post('http://menu-carlo.herokuapp.com/api/accounts/token/verify/',{
            token: tokens.refresh
        }, { headers: { "Content-Type": "application/json" } })
        .then((res) => {
            console.log('refresh token is valid')
            isValid = true
        })
        .catch((err) => {
            console.log(err)
            isValid = false
        })

        return isValid
    }

    const getAccessToken = async () => {
        let accessToken = null

        await axios.post('http://menu-carlo.herokuapp.com/api/accounts/token/verify/',{
            token: auth.tokens.access
        }, { headers: { "Content-Type": "application/json" } })
        .then(res => {
            console.log('access token is valid')
            accessToken = auth.tokens.access
        })
        .catch(() => {
            console.log('extracting new access token...')
            return getNewAccessToken() // This is a promise. Its result is in the next .then
        })
        .then((newAccessToken) => {
            // Only update accessToken if getNewAccessToken() output a new access token
            if (newAccessToken) accessToken = newAccessToken
        })

        return accessToken
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, getAccessToken}}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
