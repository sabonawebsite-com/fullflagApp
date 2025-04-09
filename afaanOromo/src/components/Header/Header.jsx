import React, { useState } from 'react'
import './Header.css'

const Header = () => {
  const omisha=["SANGAA/OX","SA'AA/COW","PRODUCTS/BU'AALEE","GALAA/CAMEL","HARREE/DONKYE","HOLAA/SHEEP","RE'EE/GOAT",]
  const[list,setList]=useState("");
  function listOfFood(){
    document.querySelector('p').innerHTML=omisha;
    setList(list)
  }
  return (
    <div className='header'>
      <div className="header-contents">
        {/* <button onClick={listOfFood}> Products</button> */}
        <p className='display-things'></p>
      </div>
    </div>
  )
}

export default Header