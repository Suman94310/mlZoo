import React from 'react'
import "./navbar.css"

export default function navbar() {
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo"><i className="fas fa-robot"></i></a>
                <ul id="nav-mobile" className="nav-links">
                    <a href="sass.html"><li>Digit</li></a>
                    <a href="badges.html"><li>Object</li></a>
                    <a href="collapsible.html"><li>Baymax</li></a>
                </ul>
            </div>
        </nav>
    )
}
