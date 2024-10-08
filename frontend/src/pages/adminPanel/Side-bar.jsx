import React from 'react'
import "./sideBar.css"
import { useNavigate} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar({AdminHomeComponent, PassengerComponent, DriverComponent,CarComponent, TripComponent, MessageComponent}) {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        const confirmLogout = window.confirm(`Do you want to log out?`);
    if (confirmLogout) {
      localStorage.removeItem('token');
        navigate('/');
      };
    }
  return (
        <div className='bg-white sidebar p-1'>
         <div className='text-center'>
         <div>
           <i class="bi bi-car-front carIcon"></i>
         </div>
         <div>
           <span className='brand-name fs-1 OnlineTaxi '>OnlineTaxi</span>
         </div>
        </div>
        <hr className='text-dark'/>
        <div className='list-group list-group-flush'>
            <a className='list-group-item py-2' onClick={AdminHomeComponent} href="#1">
                <i className='bi bi-speedometer2 fs-4 me-2' style={{color: '#20c997'}}></i>
                <span>Dashboard</span>
            </a>
            <a className='list-group-item py-2' onClick={AdminHomeComponent} href="#1">
                <i className='bi bi-house text-primary fs-4 me-2'></i>
                <span>Home</span>
            </a>
            <a className='list-group-item py-2 ' onClick={PassengerComponent} href="#1">
                <i className='bi bi-people fs-4 me-2' style={{color: '#28a745'}}></i>
                <span>Passengers</span>
            </a>
            <a className='list-group-item py-2' onClick={DriverComponent} href="#1">
                <i className="bi bi-person fs-4 me-2" style={{color: '#fd7e14'}}></i>
                <span>Drivers</span>
            </a>
            <a className='list-group-item py-2' onClick={CarComponent} href="#1">
                <i className="bi bi-car-front fs-4 me-2" style={{color: '#FFEB3B'}}></i>
                <span>Cars</span>
            </a>
            <a className='list-group-item py-2' onClick={TripComponent} href="#1">
                <i className="bi bi-map fs-4 me-2" style={{color: '#001F3F'}}></i>
                <span>Trips</span>
            </a>
            <a className='list-group-item py-2' onClick={MessageComponent} href="#1">
                <i class="bi bi-chat-left-dots fs-4 me-2" style={{color: '#20c997'}}></i>
                <span>Messages</span>
            </a>
            <a className='list-group-item py-2' href="#1"
            onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
                <i className='bi bi-power fs-4 me-2' style={{color: '#dc3545'}}></i>
                <span>Loguot</span>
            </a>
        </div>

    </div>
   
  )
}

export default Sidebar