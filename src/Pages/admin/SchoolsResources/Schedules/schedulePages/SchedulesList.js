import { Link, useParams } from 'react-router-dom'
import {users,rooms,groups} from '../../../../../Data/Users'
import SearchBar from '../../../../../Components/Common/SearchBar'
import { useState } from 'react'
import { Download, LayoutGrid, List, Pen, Trash2, X } from 'lucide-react'

const dataSet = {
    'Teachers' : {
        data : users.filter(user => user.role === 'teacher'),
        path : 'teacher',
        name: 'fullName',
        primaryKey : 'matricule'
    },
    'Groups' : {
        data : groups,
        path : 'group',
        name: 'libel',
        primaryKey : 'idGroup'
    },
    'Rooms' : {
        data : rooms,
        path : 'room',
        name: 'roomName',
        primaryKey : 'idRoom'
    },
}

export default function SchedulesList () { 
    const {entityType} = useParams()

    const {data,primaryKey,path,name} = dataSet[entityType]
    const [search,setSearch] = useState('')
  
  
    const [isAllSelected,setIsAllSelected] = useState(false)
    const [viewMode, setViewMode] = useState('grid')
    const [selectedSchedules,setSelectedSchudeles] = useState([])
    
   
    const schedules = data.filter(d => d[name].toLowerCase().startsWith(search.toLowerCase()))
    const [savedWithOutExport,setSaveWithOutExport] = useState(schedules)


    const handleDelete = (matricule) => {
        console.log('Delete schedule for matricule:', matricule)
    }
    
    const handleSearch = (value) => setSearch(value)
    const toggleViewMode = () => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')
    
    const handleSelect = (item) => {
         const isItemSelected = selectedSchedules.find(el => el === item)
         if (isItemSelected) {
            removeSelected(item)
            return false;
         }
         const newSelectedSchedules = [...selectedSchedules , item]
         setSelectedSchudeles(newSelectedSchedules)
         setIsAllSelected(newSelectedSchedules.length === schedules.length)
    }
    const removeSelected = (item) => {
        const newSelectedItems = selectedSchedules.filter(el => el !== item)
        setSelectedSchudeles(newSelectedItems)
        setIsAllSelected(false)
    }
    const handleRemoveAll = () => setSelectedSchudeles([])

    const handleSelectAll = () => {
        setSelectedSchudeles(schedules.map(schedule => schedule.fullName))
        setIsAllSelected(true)
    }
    

    return (
        <div className='max-w-6xl mx-auto space-y-4 pb-6'>
            <div className='flex items-center justify-between  py-2 mb-4'>
                <h1 className='text-xl flex-1 text-gray-700 dark:text-gray-50 font-bold'> {entityType} Schedules</h1>
                <SearchBar searchTerm={search} handleSearch={handleSearch} />
            </div>
            {
                selectedSchedules.length > 0 &&
                <div className='px-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg text-gray-700 dark:text-gray-50 font-bold mb-3'>Selected Schedules</h1> 
                        <button
                            onClick={handleRemoveAll}
                            className="px-2 py-1 rounded-lg bg-red-100 dark:bg-red-900/50 
                                            text-red-600 dark:text-red-400 
                                            hover:bg-red-200 dark:hover:bg-red-900"
                        >
                            Remove All Selected
                        </button>
                    </div>
                   
                    <div className='grid grid-cols-6 gap-3'>
                        {
                            selectedSchedules.map(schedule =>
                               <span className='px-2 py-1 rounded-full flex items-center justify-between gap-3 min-w-20 text-blue-700 dark:text-purple-50 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100'>
                                    <span className=' font-medium'>{schedule}</span>
                                    <button
                                        onClick={() => removeSelected(schedule)}
                                        className="p-2 rounded-full bg-red-100 dark:bg-red-900/50 
                                            text-red-600 dark:text-red-400 
                                            hover:bg-red-200 dark:hover:bg-red-900"
                                    >
                                        <X size={18} />
                                    </button>
                               </span>
                            )
                        }
                    </div>
                </div>
            }
            {
                savedWithOutExport.length > 0 &&
                <div className='px-4 py-3 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg text-gray-700 dark:text-gray-50 font-bold '>Saved Schedules without Export</h1> 
                        <button
                            onClick={handleRemoveAll}
                            className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 
                                            text-blue-600 dark:text-blue-400 
                                            hover:bg-blue-200 dark:hover:bg-blue-900"
                        >
                            Export All 
                        </button>
                    </div>
                    <p className='text-sm font-medium text-gray-300 dark:text-gray-600'>You saved these schedules without export them</p>
                   
                    <div className='grid grid-cols-6 gap-3 mt-3'>
                        {
                            savedWithOutExport.map(schedule =>
                               <span className='px-2 py-1 rounded-lg flex items-center justify-between gap-3 min-w-20 border text-purple-700 dark:text-purple-50 bg-purple-50 dark:bg-purple-950/50 border-purple-700 hover:bg-purple-100'>
                                    <span className=' font-medium'>{schedule[name]}</span>
                                    <button
                                        onClick={() => removeSelected(schedule)}
                                        className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 
                                            text-blue-600 dark:text-blue-400 
                                            hover:bg-blue-200 dark:hover:bg-blue-900"
                                    >
                                        <Download size={18} />
                                    </button>
                               </span>
                            )
                        }
                    </div>
                </div>
            }
            
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold'>Schedules List</h1>
                {
                    schedules.length > 0 &&
                    <div className='flex items-center gap-4'>
                    <button
                        onClick={selectedSchedules.length !== 0 && !isAllSelected  ? '' : ''}
                        className='px-2 py-1.5 rounded-lg bg-red-200 dark:bg-red-700 text-red-700 dark:text-red-50 
                            hover:bg-red-300 dark:hover:bg-red-600 transition-colors flex items-center gap-2' 
                    >
                        <Trash2 size={20} />
                        Clear {selectedSchedules.length !== 0 && !isAllSelected  ? 'Selected ' : 'All'}
                    </button>
                    <button
                        onClick={selectedSchedules.length !== 0 && !isAllSelected  ? '' : ''}
                        className='px-2 py-1.5 rounded-lg bg-blue-200 dark:bg-blue-700 text-blue-700 dark:text-blue-50 
                            hover:bg-blue-300 dark:hover:bg-blue-600 transition-colors flex items-center gap-2' 
                    >
                        <Download size={20} />
                        Export {selectedSchedules.length !== 0 && !isAllSelected  ? 'Selected ' : 'All'}
                    </button>
                    {
                        !isAllSelected &&
                        <button
                            onClick={handleSelectAll}
                            className='p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 
                                hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors' 
                        >
                            Select All
                        </button>
                    }
                    
                    <button
                        onClick={toggleViewMode}
                        className='p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 
                            hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
                        title={viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
                    >
                        {viewMode === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
                    </button>

                </div>

                }
                

            </div>
            {
                schedules.length > 0 ?
                <div className={viewMode === 'grid' ? 'grid grid-cols-3 md:grid-cols-4 gap-2' : 'space-y-2'}>
                {schedules.map(schedule => (
                    <div
                        key={schedule[primaryKey]}
                        onClick={()=>handleSelect(schedule[name])}
                        className={`flex items-center cursor-pointer justify-between gap-3 px-3 py-2 border rounded-lg transition-all duration-200
                               ${
                                 selectedSchedules.includes(schedule[name]) ? 
                                 ' bg-purple-50 dark:bg-purple-950/50 border-purple-700  text-purple-700 dark:text-purple-50 '
                                 : 'bg-white dark:bg-gray-800 hover:border-purple-500 dark:hover:border-purple-500 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-50'
                               }
                             
                               
                            `}
                    >
                       
                        <span className="font-medium flex-1 w-full block">{schedule[name]} </span>
                        
                        <div className=' flex items-center justify-end gap-2'>
                        <Link
                             to={`/schoolResources/schedule/${path}/${schedule[primaryKey]}`}
                            className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50 
                                text-purple-600 dark:text-purple-400 
                                 hover:bg-purple-200 dark:hover:bg-purple-900"
                        >
                            <Pen size={18} />
                        </Link>
                        <button
                            onClick={() => handleDelete(schedule[primaryKey])}
                            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 
                                text-blue-600 dark:text-blue-400 
                                 hover:bg-blue-200 dark:hover:bg-blue-900"
                        >
                            <Download size={18} />
                        </button>
                        <button
                            onClick={() => handleDelete(schedule[primaryKey])}
                            className="p-2 rounded-full bg-red-100 dark:bg-red-900/50 
                                text-red-600 dark:text-red-400 
                                 hover:bg-red-200 dark:hover:bg-red-900"
                        >
                            <Trash2 size={18} />
                        </button>
                        </div>
                       
                    </div>
                ))}
            </div>
             : 
             <p className="px-4 py-8 text-center text-gray-500">
                    No results found
                </p>

            }
            
        
         
        </div>
    )
}