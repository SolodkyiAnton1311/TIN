import React from "react";
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Glówna strona</Link></li>
                <li><Link to="/skleps">Sklepy</Link></li>
                <li><Link to="/klients">Klienci</Link></li>
                <li><Link to="/zakups">Zakupy</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;