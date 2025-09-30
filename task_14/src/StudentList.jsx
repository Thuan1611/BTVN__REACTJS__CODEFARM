import React from "react";
import StudentRow from "./StudentRow";
import OutStandingStudent from "./OutStandingStudent";

const StudentList = ({ students }) => {
  return (
    <div className="container mt-4">
      <table className="table table-striped table-bordered table-hover text-center align-middle">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>FullName</th>
            <th>Gender</th>
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
        <tfoot className="table-light">
          <OutStandingStudent students={students} />
        </tfoot>
      </table>
    </div>
  );
};

export default StudentList;
