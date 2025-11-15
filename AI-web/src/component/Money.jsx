import React, { useState, useRef, useEffect } from 'react';
import {
    FaUserCircle,
    FaCamera,
    FaArrowDown,
    FaArrowUp,
    FaExchangeAlt,
    FaSpotify,
    FaRegCreditCard
} from 'react-icons/fa';

// TransactionItem giữ nguyên như trước (bỏ lại hoặc import)
const TransactionItem = ({ icon, title, date, amount }) => {
    const isPositive = amount > 0;
    const amountFormatted = `${isPositive ? '+' : '-'}${Math.abs(amount).toLocaleString('vi-VN')} VND`;
    const textColor = isPositive ? 'text-green-600' : 'text-red-600';

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 rounded-full">
                    {icon}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">{title}</h4>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
            </div>
            <div className={`font-semibold ${textColor}`}>
                {amountFormatted}
            </div>
        </div>
    );
};

const Money = () => {
    // --- State ---
    const [balance, setBalance] = useState(5250000);
    const [userName] = useState("Nguyễn Văn A");
    const [userAvatar, setUserAvatar] = useState(null);

    const [transactions, setTransactions] = useState([
        { id: 1, icon: <FaSpotify size={18} className="text-green-500" />, title: "Thanh toán Spotify", date: "10 Tháng 11, 2025", amount: -150000 },
        { id: 2, icon: <FaArrowDown size={18} className="text-green-600" />, title: "Nhận tiền từ bạn bè", date: "09 Tháng 11, 2025", amount: 500000 },
        { id: 3, icon: <FaRegCreditCard size={18} className="text-blue-500" />, title: "Nạp tiền điện thoại", date: "08 Tháng 11, 2025", amount: -100000 },
        { id: 4, icon: <FaArrowUp size={18} className="text-red-600" />, title: "Rút tiền về ngân hàng", date: "07 Tháng 11, 2025", amount: -2000000 },
    ]);

    const fileInputRef = useRef(null);
    const avatarUrlRef = useRef(null); // for revoke
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Upload UI state
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        return () => {
            if (avatarUrlRef.current) {
                URL.revokeObjectURL(avatarUrlRef.current);
                avatarUrlRef.current = null;
            }
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Open file chooser
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    // When user selects a file (preview only)
    const handleAvatarChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        // preview
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        const p = URL.createObjectURL(file);
        setPreviewUrl(p);
        setSelectedFile(file);
        setMessage(null);
    };

    // Upload file to server, then request minting coins (mock flow)
    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage({ type: 'error', text: 'Vui lòng chọn ảnh trước khi upload.' });
            return;
        }

        setUploading(true);
        setUploadProgress(0);
        setMessage(null);

        try {
            // Build formData
            const fd = new FormData();
            fd.append('image', selectedFile);

            // Use XMLHttpRequest to get upload progress easily
            const uploadResult = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/api/upload'); // <-- đổi endpoint nếu cần (Express: '/upload')
                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        setUploadProgress(percent);
                    }
                };
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const json = JSON.parse(xhr.responseText);
                            resolve(json);
                        } catch (err) {
                            reject(new Error('Không parse được phản hồi upload'));
                        }
                    } else {
                        reject(new Error(`Upload thất bại: ${xhr.status}`));
                    }
                };
                xhr.onerror = () => reject(new Error('Network error during upload'));
                xhr.send(fd);
            });

            // uploadResult expected: { success: true, url: 'https://...', fileName: '...' }
            if (!uploadResult || !uploadResult.success) {
                throw new Error(uploadResult?.message || 'Upload server trả về lỗi');
            }

            // preview becomes official avatar
            if (avatarUrlRef.current) {
                URL.revokeObjectURL(avatarUrlRef.current);
                avatarUrlRef.current = null;
            }
            avatarUrlRef.current = uploadResult.url; // if server returns a public URL
            setUserAvatar(uploadResult.url);
            setSelectedFile(null);
            setPreviewUrl(null);

            // Next: mint coins (mock) — call server to "mint" coins for this upload
            // server should validate file + user + maybe give coin amount
            const mintResp = await fetch('/api/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileUrl: uploadResult.url, fileName: uploadResult.fileName || '' }),
            });

            if (!mintResp.ok) throw new Error('Lỗi khi mint coin');

            const mintJson = await mintResp.json();
            // expected { success: true, mintedAmount: 1000, txHash: '0xabc...' }
            if (!mintJson.success) throw new Error(mintJson.message || 'Mint trả về lỗi');

            // Cập nhật balance và transaction history
            const minted = Number(mintJson.mintedAmount || 0);
            setBalance(prev => prev + minted);

            const newTx = {
                id: Date.now(),
                icon: <FaArrowDown size={18} className="text-green-600" />,
                title: `Mint coin (upload ${mintJson.fileName || 'ảnh'})`,
                date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                amount: minted,
            };
            setTransactions(prev => [newTx, ...prev]);

            setMessage({ type: 'success', text: `Upload thành công. Bạn được cộng ${minted.toLocaleString('vi-VN')} VND (mô phỏng). Tx: ${mintJson.txHash || '—'}` });
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: err.message || 'Đã có lỗi xảy ra' });
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    // Cancel selected file
    const handleCancelSelection = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        setSelectedFile(null);
        setMessage(null);
    };

    return (
        <div className="h-[calc(100vh-3.5rem)] bg-gray-100 font-sans overflow-y-auto">
            <div className="flex justify-center">
                <main className="w-full lg:w-4/6 xl:w-1/2 max-w-2xl mx-auto p-4 md:p-6">
                    {/* Profile */}
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                            <div
                                className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
                                onClick={handleAvatarClick}
                            >
                                {userAvatar ? (
                                    <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <FaUserCircle className="w-full h-full text-gray-500" />
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow cursor-pointer" onClick={handleAvatarClick}>
                                <FaCamera className="text-gray-600" />
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Xin chào,</p>
                            <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
                        </div>
                    </div>

                    {/* Upload card */}
                    <div className="bg-white p-4 rounded-2xl shadow mb-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Upload ảnh để nhận coin (mô phỏng)</h3>

                        {/* Preview */}
                        {previewUrl ? (
                            <div className="flex items-center space-x-4 mb-3">
                                <img src={previewUrl} alt="preview" className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">{selectedFile?.name}</p>
                                    <p className="text-xs text-gray-500">{(selectedFile?.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <div className="space-x-2">
                                    <button className="px-3 py-1 bg-red-50 text-red-600 rounded" onClick={handleCancelSelection}>Huỷ</button>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={handleUpload} disabled={uploading}>
                                        {uploading ? 'Đang upload...' : 'Upload & Mint'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-3 text-sm text-gray-500">
                                Chưa chọn ảnh. Nhấn vào avatar hoặc <button onClick={handleAvatarClick} className="underline text-blue-600">chọn ảnh</button> để bắt đầu.
                            </div>
                        )}

                        {/* Upload progress */}
                        {uploading && (
                            <div className="w-full bg-gray-200 rounded h-2 overflow-hidden mb-2">
                                <div style={{ width: `${uploadProgress}%` }} className="h-full bg-green-500 transition-all"></div>
                            </div>
                        )}

                        {/* Message */}
                        {message && (
                            <div className={`text-sm p-2 rounded ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                {message.text}
                            </div>
                        )}
                    </div>

                    {/* Balance card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center mb-8">
                        <p className="text-sm font-medium text-gray-500 uppercase">Số dư của bạn</p>
                        <h1 className="text-4xl font-bold text-gray-900 my-2">
                            {balance.toLocaleString('vi-VN')} VND
                        </h1>
                    </div>

                    {/* Quick actions & tx history (giữ nguyên) */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:bg-gray-50 transition cursor-pointer">
                            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <FaArrowDown size={20} />
                            </div>
                            <p className="mt-2 text-sm font-semibold text-gray-700">Nạp tiền</p>
                        </div>

                        <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:bg-gray-50 transition cursor-pointer">
                            <div className="p-3 bg-red-100 rounded-full text-red-600">
                                <FaArrowUp size={20} />
                            </div>
                            <p className="mt-2 text-sm font-semibold text-gray-700">Rút tiền</p>
                        </div>

                        <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:bg-gray-50 transition cursor-pointer">
                            <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                                <FaExchangeAlt size={20} />
                            </div>
                            <p className="mt-2 text-sm font-semibold text-gray-700">Chuyển tiền</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Lịch sử giao dịch</h3>
                        <div className="bg-white rounded-2xl shadow-lg p-4">
                            {transactions.map(tx => (
                                <TransactionItem
                                    key={tx.id}
                                    icon={tx.icon}
                                    title={tx.title}
                                    date={tx.date}
                                    amount={tx.amount}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-10"></div>
                </main>
            </div>
        </div>
    );
};

export default Money;
