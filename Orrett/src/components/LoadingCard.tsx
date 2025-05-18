import React from "react";

const spinnerStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "auto",
  display: "block",
};

const spinnerContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  minHeight: "120px",
};

const LoadingCard: React.FC = () => (
  <div style={spinnerContainer}>
    <div style={spinnerStyle} />
    <style>
      {`
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
            `}
    </style>
  </div>
);

export default LoadingCard;
