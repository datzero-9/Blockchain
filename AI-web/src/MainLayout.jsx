// src/layout/MainLayout.jsx
import React from 'react'
import Header from './layout/Header'
// import Footer from './component/footer/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}

export default MainLayout