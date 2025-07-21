import React, { useState, useEffect } from "react";
import { fetchActivityData } from "../../../shared/api/activity_MonitoringhApi";

const ActivityPage = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchActivityData()
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

//   return (
    
    
//   );
};

export default ActivityPage;
