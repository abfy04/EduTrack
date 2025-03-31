import { Link, Outlet, useLocation } from "react-router-dom";


const links = [
    {
        name: "Home",
        link: "/schoolResources"
    },
    {
        name: "Filieres",
        link: "/schoolResources/filieres"
    },
    {
        name: "Groups",
        link: "/schoolResources/groups"
    },
    {
        name: "Rooms",
        link: "/schoolResources/rooms"
    },
    {
        name: "Schedules",
        link: "/schoolResources/schedules"
    },
    {
        name: "Progress",
        link: "/schoolResources/progress"
    },
    
        
]

const addLink = {
    "/schoolResources/filieres" : "addFiliere",
    "/schoolResources/groups" : "addGroup",
    "/schoolResources/rooms" : "addRoom",
    
}



export default function SchoolResources(){
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
                        ' bg-purple-300 text-purple-700 dark:bg-purple-800/50 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/70 ' 
                        : 
                        ' text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800/50'
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
                    (path === '/schoolResources/filieres' || path === '/schoolResources/groups' || path === '/schoolResources/rooms' ) && 
                    <Link to={`/schoolResources/${addLink[path]}`} className="px-4 py-2 rounded-lg font-medium text-sm
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
