import React from 'react';
import { InterviewAnalysis } from '../types/interviewAnalysis.types';

type Props = {
  data: InterviewAnalysis;
};

export const InterviewAnalysisComponent: React.FC<Props> = ({ data }) => (
  <div>
    <h2>תמלול:</h2>
    <p>{data.transcript}</p>
    <h3>דירוג כללי: {data.rating}/5</h3>
    <h3>ביטחון: {data.confidence}/5</h3>
    <ul>
      {data.feedback.map((item, i) => (
        <li key={i}>• {item}</li>
      ))}
    </ul>
  </div>
);