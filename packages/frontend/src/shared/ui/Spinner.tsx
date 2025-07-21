import React from "react";

export const Spinner = () => (
  <div className="flex justify-center items-center py-6">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

Spinner.displayName = "Spinner";