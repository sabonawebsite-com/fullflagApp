import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id="explore-menu">
      <h1 id="page-title">Omisha keenya Gabaa irraa Qabnu</h1>
      <p>Sirni kenniinsa Omishaa bu’uuraan maamiltoota oomishni keenya balbala isaaniitti akka dhiyaatu barbaadan waliin kan walqunnamsiisu networkii dha. Akkaataa idileetti qaamolee gurguddoo sadii of keessaa qaba:</p>
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