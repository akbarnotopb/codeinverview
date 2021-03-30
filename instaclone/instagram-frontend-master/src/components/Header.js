import React from 'react';

import { Link } from 'react-router-dom';

import "./Header.css";

import logo from "../assets/logo.svg";
import camera from "../assets/camera.svg";
import logout from "../assets/logout.svg";

import { userSet } from "../action/userSet.js";
import { useDispatch } from "react-redux"

export default function Header() {
  const dispatcher = useDispatch();
  return (
      <header id="main-header">
        <div className="header-content">
          <Link to="/">
            <img src={logo} alt="InstaRocket" />
          </Link>
          <div>
            <span className="actions">
              <Link to="/new">
                <img src={camera} alt="Enviar publicação" />
              </Link>
            </span>
            <span className="actions" style={{ cursor:"pointer" }}>
                <img src={logout} onClick={()=>{dispatcher(userSet(null))}} alt="Enviar publicação" />
            </span>
          </div>
        </div>
      </header>       
  );
}
