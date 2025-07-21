import React from "react";

export const Spinner = () => (
  <div className="flex justify-center items-center py-6">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

Spinner.displayName = "Spinner";



export const SpinnerSmall = () => (
  <div className="flex justify-center items-center py-4">
    <div className="w-4 h-4 border-2 border-secondary border-l-transparent rounded-full animate-spin" />
  </div>
);

SpinnerSmall.displayName = "SpinnerSmall";
