import { Link, Outlet, useLocation } from "react-router-dom";


const links = [
    {
        name: "Home",
        link: "/humanRessources"
    },
    {
        name: "Absence Managers",
        link: "/humanRessources/absenceManagers"
    },
    {
        name: "Teachers",
        link: "/humanRessources/teachers"
    }
]

const addUserLink = {
    "/humanRessources/absenceManagers" : "absenceManger",
    "/humanRessources/teachers" : "teacher"
}



export default function HumanRessources(){
   const location = useLocation();
   const path = location.pathname;
   const Links = () => {
    return (
            <div className="flex items-center gap-3">
                {links.map((link) => (
                    <Link 
                        to={link.link}
                        key={link.name}
                        className={`px-3 py-1.5 rounded-lg font-medium text-sm
                        ${path === link.link ? 
                        ' bg-purple-100 text-purple-700 dark:bg-purple-800/50 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/70 ' 
                        : 
                        ' text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }
                       
                        `}
                    >
                    {link.name}

                    </Link>
                ))}
            </div>
        )
    }
    return(
        <div className="min-h-screen ">
            <nav className="w-full border-b border-gray-200 dark:border-gray-800 
                bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 
                px-6 py-3 flex justify-between items-center shadow-sm">
                <Links/>
                {
                    (path === '/humanRessources/absenceManagers' || path === '/humanRessources/teachers') && 
                    <Link to={`/humanRessources/addUser/${addUserLink[path]}`} className="px-4 py-2 rounded-lg font-medium text-sm
                        bg-purple-600 text-white hover:bg-purple-700
                        dark:bg-purple-500 dark:hover:bg-purple-600
                        transition-colors duration-200">
                        Add New
                    </Link>
                }
                
            </nav>

            <Outlet/>
      </div>
    )
}
