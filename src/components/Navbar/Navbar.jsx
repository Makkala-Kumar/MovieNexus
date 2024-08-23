import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { Link } from 'react-router-dom';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt="Logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tvshows">TV Shows</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/new">New & Popular</Link></li>  
          <li><Link to="/watchlist">Watchlist</Link></li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search_icon} alt="Search Icon" className='icons' />
       
        
        <div className='navbar-profile'>
          <img src={profile_img} alt="Profile" className='profile' />
          <img src={caret_icon} alt="Caret Icon" className='icons' />
          <div className='dropdown'>
            <p onClick={()=>{logout()}}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
