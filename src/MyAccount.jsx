import React from "react";
import myImage from "./assets/my-image.jpeg"; // Import the image

const MyAccount = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-center sm:max-w-lg md:max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Created by</h1>
      <img
        src={myImage}
        alt="Profile"
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">pratik</h2>
      <p className="text-lg text-gray-600 mb-2">pr646708@gmail.com</p>

    </div>
  );
};

export default MyAccount;
