import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{
    render(){
        return(
            <nav className="navbar" style={{ backgroundColor: '#1c3f94' }}>
                <div className="container">
                    <Link className="navbar-brand" to="/" style={{ color: 'white' }}>Saipul Anwar</Link>
                </div>
            </nav>
        )
    }
}

export default Navbar