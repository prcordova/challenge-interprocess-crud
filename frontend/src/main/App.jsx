import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'

import Routes from './routes'


import Footer from '../components/template/Footer'

export default props =>
  <BrowserRouter>

    <div className="app">
      <Logo />
      <Nav />
      <Routes />
      <Footer />
    </div >
  </BrowserRouter>