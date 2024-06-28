import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ()=>{

    return (
        <header>
            <div className="bg-gray-700 px-4 py-4">
                <Link to='/'>
                    <h1 className="text-yellow-500 font-bold text-2xl ps-10">Workouts</h1>                    
                </Link>
            </div>
        </header>
    )
}

export default Navbar