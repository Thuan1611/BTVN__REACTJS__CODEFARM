import React from "react";
import { getColors, getRanks } from "./data";

const StudentRow = ({ item }) => {
  return (
    <tr key={item.id} style={{ background: getColors(item.score), color: "white" }}>
      <td  >{item.id}</td>
      <td>{item.fullName}</td>
      <td>{item.gender === "male"? "Nam" : "Nữ"}</td>
      <td>{item.age}</td>
      <td>{item.major}</td>
      <td>{item.score}</td>
      <td>{getRanks(item.score)}</td>
    </tr>
  );
};

export default StudentRow;
