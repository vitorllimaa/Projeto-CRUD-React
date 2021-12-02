import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Tab } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import logo from './logo512.png';

  

const Header: React.FC = () => {
   
    return(
        <div className="header">
            <img src={logo} className="logo"/>
            <Link to="/"><MenuItem>Início</MenuItem></Link>
            <Link to="/tarefas"><MenuItem>Tarefas</MenuItem></Link>
            <Link to="#"><MenuItem>Sair</MenuItem></Link>
        </div>
    ); 
}


export default Header;