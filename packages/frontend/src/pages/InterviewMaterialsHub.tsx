import React from 'react'
import { InterviewMaterialsList } from '../features/knowledge-base/components/InterviewMaterialsList';

const InterviewMaterialsHub = () => {
  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">מרכז חומרי ראיון</h1>
      <InterviewMaterialsList />
    </div>
  );
}

export default InterviewMaterialsHub
