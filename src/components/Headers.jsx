import React from "react";
import { dateTime } from "../ultils/dateTime";

const Headers = () => {
  const [hours, hour, day, month, year] = dateTime();
  if (hour >= 0 && hour < 11) {
    return "Chào buổi sáng";
  }
  if (hour >= 11 && hour < 15) {
    return "Chào buổi trưa";
  }
  if (hour >= 15 && hour < 18) {
    return "Chào buổi chiều";
  }
  if (hour >= 18 && hour < 24) {
    return "Chào buổi tối";
  }
  const getUser = JSON.parse(localStorage.getItem("data")) || null;
  console.log(getUser)
  
  return (
    <div>
      <div>
        <h1>{hour}{getUser}</h1>
      </div>
    </div>
  );
};

export default Headers;
