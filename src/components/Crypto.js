import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Crypto = () => {
    /**
    * Seater los hooks
    */
    const [search, setSearch] = useState("")
    const [cryptos, setCrytos] = useState([])


    /**
     * Funcion para traer los datos  
     */

    const enpoint = 'https://api.coingecko.com/api/v3/coins'

    const showData = () => {
        axios.get(enpoint).then((res) => {
            // console.log(res.data);
            setCrytos(res.data)
        })
    }
    useEffect(() => {
        showData()
    }, [])


    /**
     * Funcion de busqueda 
     */
    const searcher = (e) => {
        setSearch(e.target.value)
    }
    /**
     * Filtar los datos  
     */

    const resultado = !search ? cryptos : cryptos.filter((val) => val.name.toLowerCase().includes(search.toLocaleLowerCase()))

    /**
     * Renderisamos la vista de los compoenetes
     */
    return (
        <div >
            <input vale={search} onChange={searcher} type='text' placeholder='search...' className='form-control mt-5 ' />
            <div className='table-responsive' >
            <table className='table  table-dark table-hover mt-3 text-center'>
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Price 24h</th>
                    </tr>
                </thead>
                <tbody >
                    {resultado.map((res) => (

                        <tr key={res.id}>

                            <td>{res.market_data.market_cap_rank}</td>
                            <td><img src={res.image.small} alt={res.name} /> {res.name}</td>
                            <td>{res.symbol.toUpperCase()}</td>
                            <td>{res.market_data.current_price.bmd.toFixed(3)}</td>
                            <td>
                                {res.market_data.price_change_percentage_24h < 0 ? (
                                    <span className='badge bg-danger'>{res.market_data.price_change_percentage_24h.toFixed(3)}</span>
                                ) : (
                                    <span className='badge bg-success'>{res.market_data.price_change_percentage_24h.toFixed(3)}</span>
                                )

                                }
                            </td>
                        </tr>
                    )

                    )

                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Crypto