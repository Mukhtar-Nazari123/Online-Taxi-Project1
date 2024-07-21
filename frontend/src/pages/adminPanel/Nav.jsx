import React from 'react'

function Nav({Toggle}) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent position-sticky">
        <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
        <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
        ><i className='bi bi-justify'></i></button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#3"
                        id="dropdownId"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        >Mukhtar</a>
                    <div className=" dropdown-menu dropdown-menu-end" aria-labelledby="dropdownId" style = {{width : "50px", padding: '0px'}}>
                        <a className="dropdown-item" href="#3">Profile</a>
                        <a className="dropdown-item" href="#3">Setting</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    
  )
}

export default Nav