import React from 'react';

interface Props {
  id: string;
  sharedBy: string;
  sharedAt: string;
  feedbackRating?: number;
  onClick: () => void;
}

export default function SharedRecordingCard({
  id,
  sharedBy,
  sharedAt,
  feedbackRating = 0,
  onClick,
}: Props) {
  return (

    <div
  onClick={onClick}
  className="cursor-pointer bg-white shadow rounded-xl p-4 border border-[#00B894] hover:shadow-lg transition"
>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">משתף: {sharedBy}</h2>
          <p className="text-sm text-gray-500">תאריך: {new Date(sharedAt).toLocaleDateString()}</p>
        </div>
        <div className="text-yellow-400 text-xl">
          {'★'.repeat(feedbackRating)}{'☆'.repeat(5 - feedbackRating)}
        </div>
       
      </div>
    </div>
  );
}
