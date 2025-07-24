import React from "react";

declare const CodeVerificationScreen: React.FC<{
  email: string;
  onSuccess: () => void;
}>;

export default CodeVerificationScreen;
