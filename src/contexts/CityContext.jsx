import { createContext, useContext, useEffect, useReducer, useState } from "react"

const CityContext = createContext()
const BASE_URL = 'http://localhost:8080'

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {}
}

const reducer = (state, action) => {
    switch(action.type){
        case 'startLoading':
            return {...state, isLoading: true}
        case 'cities/loaded':
            return {...state, isLoading: false, cities: action.payload}
        case 'city/loaded':
            return {...state, isLoading: false, currentCity: action.payload}
        case 'city/created':
            return {...state, isLoading: false, cities: [...state.cities, action.payload]}
        case 'city/deleted':
            return {...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload)}
        default:
            throw new Error('Enter a valid action type....')
    }
}

function CityProvider({ children }) {
    const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'startLoading'})
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()
                dispatch({type: 'cities/loaded', payload: data})
            } catch (error) {
                throw new Error('Unable too fetch data.....')
            }
        }
        fetchData()
    }, [])

    const getCityData = async id => {
        if(id === currentCity.id) return
        dispatch({type: 'startLoading'})
        try{
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            dispatch({type: 'city/loaded', payload: data})
        } catch(error) {
            throw new Error('Unable to fetch data...')
        }
    }

    const createCity = async newCity => {
        dispatch({type: 'startLoading'})
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            dispatch({type: 'city/created', payload: data})
        } catch (error) {
            throw new Error('Unable to cerate new city...')
        }
    }

    const deleteCity = async id => {
        dispatch({type: 'startLoading'})
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            })
            dispatch({type: 'city/deleted', payload: id})
        } catch (error) {
            throw new Error('Unable to delete city')
        }
    }

    return (
        <CityContext.Provider value={{
            isLoading,
            cities,
            currentCity,
            getCityData,
            createCity,
            deleteCity
        }}>
            {children}
        </CityContext.Provider>
    )
}

function useCity() {
    const context = useContext(CityContext)
    if (!context) throw new Error('context is used outside of provider.....')
    return context
}

export { CityProvider, useCity }