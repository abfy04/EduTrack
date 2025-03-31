import { useState } from "react";
import { Routes } from "react-router-dom";
import SideBar from "./Components/Common/SideBar";
import Login from "./Auth/Login";
import { adminRoutes } from "./Routes/AdminRoutes";
import { teacherRoutes } from "./Routes/TeacherRoutes";
import { AbsenceManagerRoutes } from "./Routes/AbsenceManagerRoutes";
function App() {
  const [role ,setRole] = useState(localStorage.getItem('userRole') || false)
  localStorage.setItem('userRole',role)

  const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light');
  localStorage.setItem('theme',theme)
 
  return (
    <div className={`App ${theme } font-mainFont`} >
      <div className=" min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-50 font-mainFont">
        {/* Main layout container */}
        {
          !role  || role === 'null'  ? 
          <Login setRole={setRole} />
          :
          <div className="flex h-full ">
            {/* Sidebar */}
            <SideBar 
              darkMode={theme} 
              setDarkMode={setTheme} 
              role={role} 
              setRole={setRole} 
            />
            <div className={` w-full overflow-x-hidden duration-500 peer-hover:lg:ml-56 ml-16  mx-auto `}>
                <Routes > 
                  { role === 'Admin' && adminRoutes}
                  { role === 'Teacher' && teacherRoutes}
                  { role === 'Absence Manager' && AbsenceManagerRoutes}
                </Routes>
            </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
