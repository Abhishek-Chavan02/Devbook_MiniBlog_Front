import React from "react";

function Input({ 
  id, 
  type = "text", 
  placeholder = "", 
  value, 
  onChange, 
  required = false, 
  disabled = false 
}) {
  return (
    <div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%"
        }}
      />
    </div>
  );
}

export default Input;
