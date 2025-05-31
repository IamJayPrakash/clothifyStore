"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  label?: string;
  initialUrl?: string;
}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ onUpload, label = 'Upload Image', initialUrl }) => {
  const [preview, setPreview] = useState(initialUrl || '');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setPreview(data.secure_url);
      onUpload(data.secure_url);
    } catch {
      alert('Image upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
        disabled={loading}
      />
      {preview && (
        <Image src={preview} alt="Preview" width={128} height={128} className="w-32 h-32 object-cover rounded border mt-2" />
      )}
      {loading && <span className="text-primary">Uploading...</span>}
    </div>
  );
}; 