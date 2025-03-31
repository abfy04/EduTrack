import { ChevronDown } from "lucide-react"
import { useRef, useState } from "react"
import useClickOutSide from "../../utils/Hooks/useClickOutSide"

export default function TimeFilter ({selected,setNewTimeRange}){
    const [isSelectedMenuActive,setIsSelectedMenuActive]=  useState(false)
    const [selectedOption,setSelectedOption]= useState(selected)
    const selectMenuRef = useRef(null)

    const options = [
        {value:'All Time',title : 'De tous les temps'},
        {value:'Today',title : 'Aujourd\'hui'},
        {value:'Yesterday',title : 'Hier'},
        {value:'Last Week',title : 'La semaine dernière'},
        {value:'Last Month',title : 'Le mois dernier'},
    ]
    const handleClick=(option)=>{
        setNewTimeRange(option)
        setSelectedOption(option)
        setIsSelectedMenuActive(false)
    }
    const handleClickOutSide = ()=> setIsSelectedMenuActive(false)
    
    useClickOutSide(handleClickOutSide,selectMenuRef)
    return (
        <>
        <div className="relative ">
            <div ref={selectMenuRef} className=" w-2/4 min-w-56 text-gray-700 dark:text-gray-50">
                <div  
                 onClick={()=>setIsSelectedMenuActive(!isSelectedMenuActive)}
                className={` flex items-center justify-between   bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg   w-full p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  ${isSelectedMenuActive && 'border-purple-300  dark:border-purple-500 '} cursor-pointer`}
                >
                    <span>
                        {selectedOption}   
                    </span>
                    <ChevronDown size={16} className={`duration-500 ${isSelectedMenuActive && ' rotate-180 text-purple-600'}`}/>

                </div>
                { 
                    isSelectedMenuActive && 
                    <div  className="absolute right-0 mt-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                    {
                        options.map((option,index) =>
                            <span 
                                onClick={()=>handleClick(option.value)}
                                className={`w-full block px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''} ${option.value === selectedOption ? 'bg-purple-500 text-white' : ''}`}
                            >
                                {option.title}
                            </span>
                        )
                    }

                </div>
                }

            </div>
           
           

        </div>
    {/* <select  
    onChange={({target})=>setNewTimeRange(target.value)}
    defaultValue={selected}
    className="absolute right-2 top-2 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-purple-300 block w-1/3 min-w-40 p-2 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-gray-50  dark:focus:border-purple-500" 
    >
        <option value={'All Time'}>De tous les temps</option>
        <option value={'Today'}>Aujourd'hui</option>
        <option value={'Yesterday'}>Hier</option>
        <option value={'Last Week'}>La semaine dernière</option>
        <option value={'Last Month'}>Le mois dernier</option>
    </select> */}
    </>
    )
}