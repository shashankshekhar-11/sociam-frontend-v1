import React  from 'react';
import "./styles/Styles.css"
import { Header } from '../components';
import { Link } from 'react-router-dom';

const NoMatchPage=()=>{
  return (
  <div>
  <Header />

  <div className="no-match-page-content">

      <div className="no-match-content">

          <h1>404</h1>
          <p>The page you're looking for does not exist</p>
          <Link to="/home" className="action-txt">Go to Home</Link>

      </div>

    </div>

  </div>
  )
}

export default NoMatchPage;