import React from 'react';

export default function AdminEditProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product: {params.id}</h1>
      {/* TODO: Edit product form, Cloudinary upload */}
      <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
        Edit product form coming soon.
      </div>
    </main>
  );
} 