import React from 'react';
import {
    IoMenuOutline, IoSearch, IoGridOutline, IoFlaskOutline,
    IoSettingsOutline, IoWalletOutline, IoHelpCircleOutline, IoAddCircleOutline, IoMicOutline, IoSend
} from 'react-icons/io5';
import { FaRegStar, FaUserCircle } from 'react-icons/fa';
import { PiDiamondsFourFill } from 'react-icons/pi'; // Dùng icon này cho "Khám phá"

const Chatbot = () => {
    // Dữ liệu giả định cho sidebar trái
    const sidebarItems = [
        { icon: IoAddCircleOutline, label: "Đoạn chat mới", type: "main" },
        { icon: IoSearch, label: "Tìm kiếm đoạn chat", type: "main" },
        { icon: FaRegStar, label: "Thư viện", type: "main" },
        { icon: IoFlaskOutline, label: "Dự án", type: "main" },
        { icon: PiDiamondsFourFill, label: "Khám phá", type: "main" }, // Sử dụng PiDiamondsFourFill cho Khám phá
        { icon: IoGridOutline, label: "Video AI by Invideo", type: "main" },
    ];

    const recentChats = [
        "Đoạn chat",
        "React header clone",
        "Sửa file định chủ",
        "Xóa kí tự đặc biệt",
        "Dịch các cụm từ tiếng Anh",
        "Chuyển file thành docx",
        "Cách đổi ngày laptop"
    ];

    return (
        <div className="flex h-[calc(100vh-3.5rem)] bg-gray-50 text-gray-800 overflow-hidden">

            {/* Sidebar Trái */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col pt-4 pb-2">
                {/* Header Sidebar: Menu và Chat GPT dropdown */}
                <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-200">
                    <IoMenuOutline size={24} className="cursor-pointer text-gray-600" />
                    <div className="flex items-center gap-1 cursor-pointer">

                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                {/* Main Nav Items */}
                <div className="flex-grow overflow-y-auto px-2 pt-4 custom-scrollbar">
                    {sidebarItems.map((item, index) => (
                        <div key={index} className="flex items-center p-2.5 my-1 rounded-lg hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700">
                            {item.icon && <item.icon size={20} className="mr-3 text-gray-600" />}
                            {item.label}
                        </div>
                    ))}

                    {/* Recent Chats */}
                    <div className="px-2 pt-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Đoạn chat</h3>
                        {recentChats.map((chat, index) => (
                            <div key={index} className="flex items-center p-2.5 my-1 rounded-lg hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700 truncate">
                                <span className="mr-3">💬</span> {/* Placeholder for chat icon */}
                                {chat}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Khu vực Chat Chính */}

            <div className="flex-grow flex flex-col overflow-hidden">
              
                <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-end px-4 flex-shrink-0">
                    <IoSettingsOutline size={24} className="cursor-pointer text-gray-600 hover:text-gray-800" />
                </div>

         
                <div className="flex-grow flex flex-col items-center justify-end p-6 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-8">Tôi có thể giúp gì cho bạn?</h2>

             
                    <div className="w-full max-w-2xl bg-white rounded-xl shadow-md flex items-center px-4 py-3 border border-gray-200">
                        <IoAddCircleOutline size={24} className="text-gray-500 cursor-pointer mr-3" />
                        <input
                            type="text"
                            placeholder="Hỏi bất kỳ điều gì"
                            className="flex-grow bg-transparent focus:outline-none text-base"
                        />
                        <IoMicOutline size={24} className="text-gray-500 cursor-pointer ml-3 mr-2" />
                        <IoSend size={24} className="text-blue-600 cursor-pointer" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Chatbot;