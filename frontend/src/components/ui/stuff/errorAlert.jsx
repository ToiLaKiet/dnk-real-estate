import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported
const ErrorAlert = ({ message }) => {
    const [visible, setVisible] = React.useState(true);
  
    if (!visible) return null;
  
    return (
      <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
        <span>{message}</span>
        <button className="btn-close" onClick={() => setVisible(false)}></button>
      </div>
    );
  };
export default ErrorAlert;
