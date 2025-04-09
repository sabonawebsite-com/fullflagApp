import React, { useContext } from 'react';  
import './LiveStockDisplay.css';  
import { StoreContext } from '../../context/StoreContext';   
import LiveStockItem from '../LiveStockItem/LiveStockItem';   
import { assets } from '../../assets/assets';

const LiveStockDisplay = ({ category }) => {  
  const { LiveStock_list, loading, error } = useContext(StoreContext);  

  // Loading state handling  
  if (loading) {  
    return <p>Daataa LiveStock fe'aa jira...</p>;   
  }  

  // Error handling  
  if (error) {  
    return <p>Dogoggora deetaa LiveStock fe'uu: {error.message}</p>;  
  }  

  // Filter LiveStock list by category  
  const filteredLiveStockList = category === "All"   
    ? LiveStock_list   
    : LiveStock_list.filter(item => item.category === category);  

  // Handle case when no stocks are available  
  if (!filteredLiveStockList.length) {  
    return(
      <div className="noproduct">
        
         <p>Dhifaama gosa kanan omishaa gabaa irraa hin qabnuu.</p>
         <img src={assets.notfound} alt="No live LiveStock" />
      </div>
    )  
  }  

  return (  
    <div className='LiveStock-display' id='LiveStock-display'>  
      <h1>
      Oomisha Keenya Gabaa Irratti Argamu
      </h1>  
      <div className="LiveStock-display-list">  
        {filteredLiveStockList.map((item) => (  
          <LiveStockItem  
            key={item._id} // Use unique identifier as key  
            id={item._id}  
            name={item.name}  
            description={item.description}  
            price={item.price}  
            image={item.image}  
          />  
        ))}  
      </div>  
    </div>  
  );  
};  

export default LiveStockDisplay;