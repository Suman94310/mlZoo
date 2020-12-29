import React from 'react'
import "./navbar.css"

import {Link} from 'react-router-dom'

export default function navbar() {
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo"><i className="fas fa-robot"></i></a>
                <ul id="nav-mobile" className="nav-links">
                    <Link to="/digit"><li>Digit</li></Link>
                    <Link to="/object"><li>Object</li></Link>
                    <Link to="/baymax"><li>Baymax</li></Link>
                </ul>
            </div>
        </nav>
    )
}
