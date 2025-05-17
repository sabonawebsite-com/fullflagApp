import React, { useContext, useState, useEffect } from 'react';  
import { assets } from '../../assets/assets';  
import './Navbar.css';  
import { Link, useNavigate } from 'react-router-dom';  
import { StoreContext } from '../../context/StoreContext';  
import Searchle from '../Searchble/Searchle';  
import Comm_spo from '../Comm_spo/Comm_spo';
import PopupAd from '../PopupAd/PopupAd'; // Add this import

const Navbar = ({ setShowlogin }) => {  
  const [showSearch, setShowSearch] = useState(false);
  const [comm_spo, setComm_spo] = useState(false);
  const [userData, setUserData] = useState(false);
  const [menu, setMenu] = useState("home");  
  const [showAd, setShowAd] = useState(true); // Add this state
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);  
  const navigate = useNavigate();  

  // Show popup ad after 5 seconds (only once per session)
  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem('hasSeenAd');
    if (!hasSeenAd) {
      const timer = setTimeout(() => {
        setShowAd(true);
        sessionStorage.setItem('hasSeenAd', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleSearch = () => {  
    setShowSearch(!showSearch);  
  };

  const comm_advert = () => {
    setComm_spo(!comm_spo);
  };

  const userDataHandeler = () => {
    setUserData(!userData);
  };

  const logout = () => {  
    localStorage.removeItem("token");  
    setToken("");    
    navigate("/");  
  };  

  return (  
    <div className='navbar'>
      {/* Popup Ad */}
      {showAd && <PopupAd onClose={() => setShowAd(false)} />}
      
      <Link to='/'>  
        <img title='logo' src={assets.group1} alt="" className='logo' />  
      </Link>  
      <a title='Gara Afaan oromotti jijiruuf' className='afaan-oromo' href="http://localhost:5174/">Afaan Oromoo</a>
      <ul className="navbar-menu">  
        <Link title='home' to='/' className={menu==="home" ? "active" : ""} onClick={() => setMenu("home")}>home</Link>  
        <a title='product list ' href='#explore-menu' className={menu==="menu" ? "active" : ""} onClick={() => setMenu("menu")}>Product-List</a>  
        <a title='contact us ' href='#footer' className={menu==="contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>contact-us</a>  
        <a title='for more information ' href='#contact' className={menu==="Add-info" ? "active" : ""} onClick={() => setMenu("Add-info")}>Add-info</a>  
      </ul>  
      <a title='advertiments' href="https://sabonawebsite-com.github.io/exithome/" className='advertise'><img src={assets.advert} alt="m"/></a>
      {comm_spo && <Comm_spo/>}
      <a href='http://127.0.0.1:5000/'>
        <img title='Upload your product' className='user' src={assets.user1} alt="" />
      </a>
      {useState && <userData/>}
      <div className="navbar-right">  
        <img title='search product' onClick={toggleSearch} className='search-icon1' src={assets.search_icon} alt="" />  
        {showSearch && <Searchle />}  
        <div className="navbar-search-icon">  
          <Link title='check your cart' to='/cart'><img src={assets.car_liveStock} alt="" /></Link>  
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>  
        </div>  
        {!token ? (  
          <button title='sign in to our web app' onClick={() => setShowlogin(true)} className='sigin-in'>sign in</button>  
        ) : (  
          <div className='navbar-profile'>  
            <img src={assets.profile_icon} alt="" />  
            <ul className='navbar-profile-dropdown'>
              <hr />  
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>  
            </ul>  
          </div>  
        )}  
      </div>  
    </div>  
  );  
};  

export default Navbar;