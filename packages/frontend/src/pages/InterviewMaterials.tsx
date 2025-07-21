import React from 'react'
// import {InterviewMaterialsList} from '../features/infoItems/components/InterviewMaterialsList';
import InterviewMaterialView from '../features/knowledge-base/components/interviewMaterialPage';

const InterviewMaterials = () => {
  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">מרכז חומרי ראיון</h1>
      < InterviewMaterialView/>
    </div>
  );
}

export default InterviewMaterials
