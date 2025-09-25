import React from "react";
import StudentRow from "./StudentRow";
import OutStandingStudent from "./OutStandingStudent";

const StudentList = ({ students }) => {

  return (
    <div>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>FullName</th>
            <th>gender</th>
            <th>Age</th>
            <th>Major</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => (
            <StudentRow key={item.id} item={item} />
          ))}
        </tbody>
        <tfoot>
          <OutStandingStudent students={students}/>
        </tfoot>
      </table>
    </div>
  );
};

export default StudentList;
