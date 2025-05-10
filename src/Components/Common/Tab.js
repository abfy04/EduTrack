export const Tab = ({section,setSection,activeSection}) => {
    const activeStyle = 'border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 font-medium';
    const desactiveStyle = 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200';
    const getTheStyle = (s) => s === activeSection ? activeStyle : desactiveStyle
     
    return (
        <button
            onClick={() => setSection(section)}
            className={`px-4 py-2 text-sm ${getTheStyle(section)}`}
        >
            {section}
        </button>
    )
      
}

export const TabContainer = ({children}) => {
    return (
        <div className="flex flex-1 items-center gap-2 mb-3 border-b border-gray-200 dark:border-gray-700">
            {children}
        </div>
    )
}
