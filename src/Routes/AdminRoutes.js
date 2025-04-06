import { Route } from "react-router-dom"

//main pages
import Dashboard from "../Pages/common/Dashboard"

//school resources
import Filieres from "../Pages/admin/SchoolsResources/Filieres/Filieres";
import Groups from "../Pages/admin/SchoolsResources/Groups/Groups";
import Rooms from "../Pages/admin/SchoolsResources/Rooms";
import Schedule from "../Pages/admin/SchoolsResources/Schedules/Schedule";
import SchedulesList from "../Pages/admin/SchoolsResources/Schedules/schedulePages/SchedulesList";
import SchoolRessources from "../Pages/admin/Indexes/SchoolRessources";
import SchoolResources from "../Pages/admin/SchoolsResources/SchoolResources";

//human resources
import Teachers from "../Pages/admin/HumanResources/Teachers";
import AbsenceManagers from "../Pages/admin/HumanResources/AbsenceManagers";
import HumanRessources from "../Pages/admin/Indexes/HumanRessources";
import HumanResources from "../Pages/admin/HumanResources/HumanResources";
import TrackProgress from "../Pages/admin/SchoolsResources/Progress/TrackProgress";



//Add pages
import AddUser from "../Pages/Forms/AddForms/AddUser";
import AddFiliere from "../Pages/Forms/AddForms/AddFiliere";
import AddGroup from "../Pages/Forms/AddForms/AddGroup";
import AddRoom from "../Pages/Forms/AddForms/AddRoom";
//edit pages
import EditUser from "../Pages/Forms/EditForms/EditUser";
import EditFiliere from "../Pages/Forms/EditForms/EditFiliere";
import EditGroup from "../Pages/Forms/EditForms/EditGroup";
import EditRoom from "../Pages/Forms/EditForms/EditRoom";

//profiles pages
import ProfileGroup from "../Pages/admin/SchoolsResources/Groups/ProfileGroup";
import ProfileFiliere from "../Pages/admin/SchoolsResources/Filieres/ProfileFiliere";
import Profile from "../Pages/common/UserProfile";

//history pages
import AbsencesHistorique from "../Pages/admin/Historique/AbsencesHistorique";
import SchedulesHistorique from "../Pages/admin/Historique/SchedulesHistorique";
import TeacherSchedulesArchive from "../Pages/admin/Historique/TeacherSchedulesArchive";
import Historiques from "../Pages/admin/Historique/Historiques";
import History from "../Pages/admin/Indexes/History";
//configuration pages
import Configuration from "../Pages/admin/Indexes/Configuration";

import { ModalProvider } from "../utils/Context/ModalContext";
import Progress from "../Pages/admin/SchoolsResources/Progress/Progress";
import Home from "../Pages/admin/SchoolsResources/Schedules/schedulePages/Home";



export const adminRoutes = [
    <Route index path="/" element={<Dashboard/>}/>,
    
    /* profilesRoute */
    <Route path="/profile/:role" element={<Profile/>}/>,
 
   
   
  
    <Route path="/configuration" element={<Configuration />} />,
    <Route path="/historique" element={<History/>}>
        <Route index element={<Historiques/>}/>
        <Route path="absenceHistorique" element={<AbsencesHistorique />}/>
        <Route path="schedulesHistorique" element={<SchedulesHistorique />}/>
        <Route path="schedulesHistorique/:id" element={<TeacherSchedulesArchive/>}/>
    </Route>,

    <Route path="/humanResources" element={<HumanRessources />}>
        <Route index element={<HumanResources/>}/>
        <Route path="absenceManagers"  element={<AbsenceManagers />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="addUser/:role?" element={<AddUser/>}/>,   
        <Route path="editUser/:id" element={<EditUser/>}/>,

    </Route>,
    // schoolResources => rooms,schedules , filieres, groups
    <Route path="/schoolResources" element={<SchoolRessources/>}>
        <Route index element={<SchoolResources/>}/>
        <Route path="filieres" element={<Filieres/>}/>
        <Route path="groups" element={<Groups/>}/>
        <Route path="rooms" element={<Rooms/>}/>

        <Route path="schedules" element={<Home/>}/>
        <Route path="schedulesList/:entityType" element={<SchedulesList/>}/>
      
        <Route path="schedule/:entity/:id" element={<Schedule />}/>

        <Route path="addFiliere" element={<AddFiliere/>}/>
        <Route path="addGroup" element={<AddGroup/>}/>
        <Route path="addRoom" element={<AddRoom/>}/>
       
        <Route path="editFiliere/:id" element={<EditFiliere/>}/>
        <Route path="editGroup/:id" element={<EditGroup/>}/>
        <Route path="editRoom/:idRoom" element={<EditRoom/>}/>

        <Route path="groupProfile/:id" element={<ModalProvider><ProfileGroup/></ModalProvider>}/>
        <Route path="filiereProfile/:id" element={<ModalProvider><ProfileFiliere/></ModalProvider>}/>

        <Route path="progress" element={<Progress />}/>
        <Route path="progress/:filter/:id" element={<TrackProgress />}/>
    </Route>
]