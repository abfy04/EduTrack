import { Route } from "react-router-dom";
import Dashboard from "../Pages/common/Dashboard";
import Profile from "../Pages/common/UserProfile";
import Justification from "../Pages/AbsenceManager/Justification";
import AbsenceListes from "../Pages/AbsenceManager/AbsenceListes";
import Schedules from "../Pages/AbsenceManager/Schedules";
import Students from "../Pages/AbsenceManager/Students";
import AddStudent from "../Pages/Forms/AddForms/AddStudents/AddStudent";
import EditStudent from "../Pages/Forms/EditForms/EditStudent";
import ProfileStudent from "../Pages/AbsenceManager/ProfileStudent";
import GroupAbsenceListes from "../Pages/AbsenceManager/GroupAbsenceListes";
import List from "../Pages/AbsenceManager/List";
export const AbsenceManagerRoutes = [
    <Route index path="/" element={<Dashboard/>}/>,
    <Route path="/profile/:role" element={<Profile/>}/>,
    <Route path="/justification" element={<Justification/>}/>,
    <Route path="/absenceListes" element={<AbsenceListes/>}/>,
    <Route path="/absenceListes/group/:idGroup" element={<GroupAbsenceListes/>}/>,
    <Route path="/absenceListes/group/:idGroup/week/:weekId" element={<List/>}/>,
    <Route path="/schedules" element={<Schedules/>}/>,
    <Route path="/students" element={<Students/>}/>,
    <Route path='/students/addStudent' element={<AddStudent />} />,
    <Route path='/students/editStudent/:cef' element={<EditStudent />} />,
    <Route path='/students/student/:cef' element={<ProfileStudent />} />,
]

