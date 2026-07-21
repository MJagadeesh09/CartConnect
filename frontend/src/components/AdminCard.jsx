import React from "react";

function AdminCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        borderRadius: "18px",
        padding: "25px",
        minWidth: "220px",
        boxShadow: "0 10px 25px rgba(0,0,0,.15)",
        transition: ".3s",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      <div
        style={{
          fontSize: "38px",
          marginBottom: "10px"
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h1
        style={{
          marginTop: "10px"
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default AdminCard;