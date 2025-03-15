import React, { useState } from "react";
import axios from "axios";

export default function ProfileImage({ user }) {
    const [profileImage, setProfileImage] = useState(user.profile_image || "/storage/assets/avatars/avatar.png");

    // Handle file selection and send user_id
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile_image", file);
        formData.append("user_id", user.id); // ✅ Send user_id to backend

        try {
            const response = await axios.post("/api/update-profile-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            setProfileImage(response.data.profile_image); // ✅ Update UI with new image

            // ✅ Reload page after successful upload
            setTimeout(() => {
                window.location.reload();
            }, 500); // Small delay for smooth UI update
        } catch (error) {
            console.error("Error updating profile image:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center text-center space-y-3">
            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profileUpload"
                onChange={handleFileChange}
            />

            {/* Clickable Profile Image */}
            <label htmlFor="profileUpload" className="cursor-pointer">
                <img
                    src={profileImage}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover transition-all duration-200 hover:opacity-75"
                />
            </label>

            {/* Name & Subtitle */}
            <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">Keep learning!</p>
            </div>
        </div>
    );
}
