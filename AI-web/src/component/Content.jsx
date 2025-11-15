import React from 'react'

const SvgIcon = ({ children, className = "", size = 24, strokeWidth = 2, color = "currentColor", ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...rest}
    >
        {children}
    </svg>
);

const UserIcon = (props) => (<SvgIcon {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></SvgIcon>);
const VideoIcon = (props) => (<SvgIcon {...props}><path d="m22 8-6 4 6 4V8Z" /><rect x="2" y="6" width="14" height="12" rx="2" ry="2" /></SvgIcon>);
const ImageIcon = (props) => (<SvgIcon {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></SvgIcon>);
const MenuIcon = (props) => (<SvgIcon {...props}><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></SvgIcon>);
const MessageIcon = (props) => (<SvgIcon {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></SvgIcon>);
const ThumbsUpIcon = (props) => (<SvgIcon {...props}><path d="M7 10v12h10l3.83-6.17a1.414 1.414 0 0 0 .17-1.12V8a2 2 0 0 0-2-2h-3.43a2 2 0 0 0-1.66.88L12 8l-1.92-2.88a2 2 0 0 0-1.66-.88H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2z" /></SvgIcon>);
const ShareIcon = (props) => (<SvgIcon {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="16" /></SvgIcon>);
const XIcon = (props) => (<SvgIcon {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></SvgIcon>);
const PlusIcon = (props) => (<SvgIcon {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></SvgIcon>);
const SmileIcon = (props) => (<SvgIcon {...props}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></SvgIcon>);


const ProfileIcon = (props) => <UserIcon {...props} />;



const StoryCard = ({ user, imageUrl, isCreate }) => (
    <div
        className={`w-28 h-44 rounded-xl shadow-md overflow-hidden flex-shrink-0 cursor-pointer transition-transform duration-300 transform hover:scale-[1.02] ${isCreate ? 'bg-white border-2 border-gray-100' : 'bg-cover bg-center'}`}
        style={!isCreate ? {
            backgroundImage: `url(${imageUrl || 'https://placehold.co/100x150/5C6BC0/FFFFFF?text=Story'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        } : {}}
    >
        {isCreate ? (
            <div className="flex flex-col items-center justify-end h-full pt-2 bg-gray-50">
                <div className="p-1 rounded-full bg-blue-500 text-white border-4 border-white">
                    <PlusIcon className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mt-1 pb-2">Tạo tin</p>
            </div>
        ) : (
            <>
                <div className="p-2">
                    {/* Icon hồ sơ */}
                    <ProfileIcon className="w-8 h-8 rounded-full border-4 border-blue-500 text-white bg-gray-600 p-0.5" />
                </div>
                <div className="flex items-end h-full p-2">
                    <span className="text-xs font-semibold text-white truncate w-full">{user}</span>
                </div>
            </>
        )}
    </div>
);

const Content = () => {
    const CreatePostArea = () => (
        <div className="bg-white p-4 rounded-xl shadow-lg mb-6 w-full">
            <div className="flex items-center border-b pb-3 mb-3">
                <ProfileIcon className="w-10 h-10 text-gray-800 bg-gray-200 rounded-full mr-3 p-0.5" />
                <input
                    placeholder="Hoàng ơi, bạn đang nghĩ gì thế?"
                    className="flex-grow py-2 px-4 bg-gray-100 rounded-full focus:outline-none placeholder-gray-500 text-sm cursor-pointer"
                />
                {/* Icons đã được đưa lên khu vực input, nên phần này để trống */}
            </div>
            <div className="flex justify-between pt-2">
                <div className="flex items-center text-red-500 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <VideoIcon className="mr-2 w-5 h-5" />
                    <span className="font-semibold text-sm hidden sm:block">Video trực tiếp</span>
                </div>
                <div className="flex items-center text-green-500 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <ImageIcon className="mr-2 w-5 h-5" />
                    <span className="font-semibold text-sm hidden sm:block">Ảnh/video</span>
                </div>
                <div className="flex items-center text-yellow-500 hover:bg-gray-100 p-2 rounded-lg cursor-pointer hidden sm:flex">
                    <SmileIcon className="mr-2 w-5 h-5" />
                    <span className="font-semibold text-sm">Cảm xúc/hoạt động</span>
                </div>
            </div>
        </div>
    );

    const PostCard = () => (
        <div className="bg-white p-4 rounded-xl shadow-lg mb-6 w-full">
            {/* Header Post */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                    <ProfileIcon className="w-10 h-10 text-blue-500 bg-gray-200 rounded-full mr-3 p-0.5" />
                    <div>
                        <p className="font-bold text-gray-900">Grabcar TV</p>
                        <p className="text-xs text-gray-500">6 phút - đang cảm thấy cô đơn.</p>
                    </div>
                </div>
                <div className="flex space-x-2 text-gray-500">
                    <MenuIcon className="w-5 h-5 cursor-pointer" />
                    <XIcon className="w-5 h-5 cursor-pointer" />
                </div>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-800 mb-3">
                Lâu rồi mình mới nhận được cuốc xe gọi là "nhân giá". Ví dụ cuốc "giá cao" gặp đôi ngày thường nên tâm trạng mình cũng khá vui vẻ thoải mái. Chờ hơi lâu cũng ko bị bu... <span className="font-semibold text-gray-700 cursor-pointer">Xem thêm</span>
            </p>

            {/* Image/Map */}
            <div className="w-full rounded-lg overflow-hidden mb-3 border-4 border-gray-100">
                {/* Sử dụng placeholder map/ảnh */}
                <img
                    src="https://placehold.co/600x350/C8E6C9/388E3C?text=Bản+Đồ+900+M"
                    alt="Bản đồ"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Footer (Likes/Comments) - Simplified */}
            <div className="flex justify-between border-t border-gray-100 pt-3 text-sm text-gray-600">
                <div className="flex space-x-6">
                    <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded-md">
                        <ThumbsUpIcon className="w-4 h-4" />
                        <span>Thích</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded-md">
                        <MessageIcon className="w-4 h-4" />
                        <span>Bình luận</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded-md">
                        <ShareIcon className="w-4 h-4" />
                        <span>Chia sẻ</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <div className="flex justify-center">
                <main className="w-full lg:w-4/6 xl:w-1/2 max-w-2xl mx-auto p-4 pt-6">
                    <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        <StoryCard isCreate={true} />
                        <StoryCard user="Hào Lee" imageUrl="https://placehold.co/100x150/EF4444/FFFFFF?text=Story1" />
                        <StoryCard user="Ntn Thaoo" imageUrl="https://placehold.co/100x150/F97316/FFFFFF?text=Story2" />
                        <StoryCard user="Hnngg Vỹ" imageUrl="https://placehold.co/100x150/10B981/FFFFFF?text=Story3" />
                        <StoryCard user="Tên Dài Hơn" imageUrl="https://placehold.co/100x150/6366F1/FFFFFF?text=Story4" />
                    </div>

                    <CreatePostArea />

                    <PostCard />
                    <PostCard />
                </main>


            </div>
        </div>
    );
}

export default Content
