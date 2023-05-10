import React from "react";

const NotFoundPage = () => {
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column'}}>
      <h1 style={{color: "white"}}>404 Error - Page Not Found</h1>
      <p style={{color: "white"}}>The requested page could not be found.</p>
      <button style={{ padding: "10px 20px", cursor: "pointer", marginTop: '20px' }} onClick={handleGoBack}>Back to Content</button>
    </div>
  );
};

export default NotFoundPage;
