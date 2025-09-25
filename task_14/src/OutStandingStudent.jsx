import React, { Children } from "react";

const OutStandingStudent = ({ students }) => {
  const bestStudents = students.reduce((acc, cur) => {
    return acc.score > cur.score ? acc : cur;
  }, students[0]);
  return (
    <tr>
      <td>Học viên xuất sắc nhất là: {bestStudents.fullName}</td>
    </tr>
  );
};

export default OutStandingStudent;
