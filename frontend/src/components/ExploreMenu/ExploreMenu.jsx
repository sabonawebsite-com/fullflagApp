import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id="explore-menu">
      <h1 id="page-title">Explore our product</h1>
      <p>A Product delivery system is essentially a network that connects  with customers who want our product delivered to their doorstep. It typically involves three main parties:</p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item' id='next'>
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p className='text-show'>{item.menu_name}</p>
            </div>
          )
        })}
        <hr />
      </div>
    </div>
  )
}
export default ExploreMenu