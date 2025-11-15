import React, { useEffect } from "react";
// Import hook useLocation để lấy URL hiện tại
import { Link, useLocation } from 'react-router-dom'; 

import { FaSearch, FaRocketchat, FaRobot, FaUserCircle } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoHome, IoNotificationsSharp, IoSettings } from "react-icons/io5";
import { GiWallet } from "react-icons/gi";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {

        window.scrollTo({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }, [pathname]);

    return null;
};


const Header = () => {
    // Lấy object location, chứa đường dẫn hiện tại (pathname)
    const { pathname: currentPath } = useLocation();
    const isActive = (path) => currentPath === path;

    const getTabClasses = (path) => {
        
        const baseClasses = "flex items-center px-8 cursor-pointer rounded-lg h-full transition-colors duration-200";
        
        if (isActive(path)) {
           
            return `${baseClasses} border-b-4 border-blue-600 text-blue-600`;
        } else {
      
            return `${baseClasses} text-gray-500 hover:bg-gray-100`; 
        }
    };

    return (
        <div className="sticky top-0 z-50 grid grid-cols-5 h-14 bg-white shadow-md px-4 lg:px-6">
            <ScrollToTop /> 

            {/* Cột 1: Search */}
            <div className="flex items-center justify-start col-span-1 gap-3">
                <div className="p-2 bg-blue-600 rounded-full cursor-pointer hidden md:block w-[20%] text-white">
                    <FaSearch size={20} />
                </div>

                <div className="relative hidden md:block w-[80%]">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="pl-4 pr-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                </div>
            </div>

            {/* Cột 2: 4 tab chính */}
            <div className="flex items-center justify-center col-span-3 gap-10"> 
                {/* HOME */}
                <Link to="/home">
                    <div className={getTabClasses('/home')}>
                        <IoHome size={25} />
                    </div>
                </Link>
                {/* CHAT */}
                <Link to="/chat">
                    <div className={getTabClasses('/chat')}>
                        <FaRocketchat size={25} />
                    </div>
                </Link>
                {/* MONEY TRANSFER */}
                <Link to="/money">
                    <div className={getTabClasses('/money')}>
                        <FaMoneyBillTransfer size={25} />
                    </div>
                </Link>
                {/* CHATBOT */}
                <Link to="/chatbot">
                    <div className={getTabClasses('/chatbot')}>
                        <FaRobot size={25} />
                    </div>
                </Link>
            </div>

            {/* Cột 3: Hành động bên phải */}
            <div className="flex items-center justify-end gap-3 col-span-1">
                <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer text-gray-700">
                    <GiWallet size={25} />
                </div>
                <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer text-gray-700">
                    <IoNotificationsSharp size={25} />
                </div>
                <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer text-gray-700">
                    <IoSettings size={25} />
                </div>
                <div className="p-0.5 rounded-full cursor-pointer text-gray-700">
                    <FaUserCircle size={25} />
                </div>
            </div>
        </div>
    );
};

export default Header;