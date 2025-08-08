import React from 'react'
import './LogoSearch.css'
import Logo from '../../Img/logo.png';

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>

      <img src={Logo} alt="" />

      {/* Commented out non-functional search
      <div className="Search">
        <input type="text" placeholder='#Search' />

        <div className="s-icon">
          <SearchIcon />
        </div>
      </div>
      */}

    </div>
  )
}

export default LogoSearch
