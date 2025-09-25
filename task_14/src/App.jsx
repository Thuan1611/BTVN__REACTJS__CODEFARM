import { students } from "./data";
import OutStandingStudent from "./OutStandingStudent";
import StudentList from "./StudentList";
import StudentRow from "./StudentRow";
function App() {
  return (
    <>
      <StudentList students={students}/>
    </>
  );
}

export default App;
