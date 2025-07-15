import React, { useState } from "react";
import { useSelector } from "react-redux";

const Modal = ({ onClose }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [addresses, setAddresses] = useState([`${userInfo.address}`]);
  const [newAddress, setNewAddress] = useState("");

  const addAddress = () => {
    if (newAddress.trim()) {
      setAddresses((prev) => [...prev, newAddress.trim()]);
      setNewAddress("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#2e1a1a] p-6 rounded-lg w-full max-w-md text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Saved Addresses</h3>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 font-bold"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-2 mb-4">
          {addresses.map((addr, index) => (
            <li key={index} className="bg-[#4a2a2a] p-2 rounded">
              {addr}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="flex-1 px-3 py-2 bg-[#3b1f1f] border border-[#5e2e2e] rounded-md focus:outline-none"
          />
          <button
            onClick={addAddress}
            className="bg-[#F93838] px-4 py-2 rounded-md hover:bg-[#e72e2e]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
