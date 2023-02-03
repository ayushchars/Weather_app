import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "./app.css"
function App() {




    const [data, setdata] = useState({})
    const [name, setname] = useState("")
    const [button, setbutton] = useState("delhi")


    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${button}&appid=f56f24967aaf51182d1d4df628297c6d`)
            .then(res => {
                console.log(res.data)
                setdata(res.data)
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    setdata({ cityNotFound: true })
                }
                else {
                    console.log(err)

                }
            })
    }, [button])


    return (
        <div className='container'>
            <h1 className='title'>Todays Weather</h1>

            <div className='search_bar'>
                <input type="text" value={name} onChange={e => setname(e.target.value)} placeholder=" search weather " />
                <button onClick={() => setbutton(name)}>My Weather</button>
            </div>


            {data.cityNotFound ? (
                <div className='content'>
                    <h1>City not found. Try another one.</h1>
                </div>
            ) : (
                typeof data.main === 'object' && (
                    <div className='content'>
                        <h1>{data.name}</h1>
                        <h2>{Math.round(data.main.temp - 273.15)}°C</h2>
                        <span>longitude - {data.coord.lon}</span>
                        <span>latitude -{data.coord.lat}</span>
                        <h2>humidity - {data.main.humidity}</h2>
                    </div>
                )
            )}


        </div>
    )
}

export default App