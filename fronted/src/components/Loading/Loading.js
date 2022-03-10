import React from 'react'
import './Loading.css'

const Spinner = () => (
    <div className="spinner">
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
)

export default Spinner
