import React from 'react';
function NotFound() {
  return (
    <div className="not-found-page fullscreen-404-page">
      <div className="fullscreen-404-container">
        <img 
          src="/404_illustration.png" 
          alt="404 Page Not Found Illustration" 
          className="not-found-img fullscreen-404-img"
        />
      </div>
    </div>
  );
}

export default NotFound;
