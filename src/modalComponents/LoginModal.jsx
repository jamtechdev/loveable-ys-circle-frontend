"use client";
import React from "react";

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
          />

          <button type="submit" className="theme-btn-primary w-full py-2">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
