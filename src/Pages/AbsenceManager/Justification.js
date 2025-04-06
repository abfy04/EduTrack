import SelectWeek from "../../Components/form/SelectWeek"
import Table from "../../Components/table/Table"
import { absences } from "../../Data/AbsenceData"
import { ModalProvider } from "../../utils/Context/ModalContext"  
import { TableProvider } from "../../utils/Context/TableContext"
import { useState } from "react"
import { weeks } from "../../Data/weeksData"
export default function Justification(){
    const config = {
        name : 'teacher',
        actions :false,
        selectable : true,
        columns : [
          { 
            field: 'fullName', 
            header: 'Full Name',
          },
          { 
            field: 'group', 
            header: 'Group Name'
          },
          { 
            field: 'typeAbsence', 
            header: 'Type Absence'
          },
          { 
            field: 'totalAbsence', 
            header: 'Total Absence',
          },
          { 
            field: 'totalLate', 
            header: 'Total Late',
          },
          { 
            field: 'successiveDates', 
            header: 'Successive Date',
            width : '2fr'
          
          }
        ],
        searchBy : ['fullName'],
        filterBy : ['group','typeAbsence','totalAbsence','typeAbsence','totalLate'],
        
        links:false,
        modals : false,
        primaryKey : 'idAbsence'
       }
       const activeWeek = getActiveWeek(weeks)
       const activeDay = getActiveDay()

       
       const [selectedWeek,setSelectedWeek] = useState(activeWeek)
       const [selectedDay,setSelectedDay] = useState( getActiveDay())
       
       const handleSelectWeek = (week) => {
        setSelectedWeek(week)
        setSelectedDay(activeWeek.week === week.week ? getActiveDay() : false)
       }
       const daysOfWeek = getWeekDates(selectedWeek.from)
      
    return(
        <div className=" max-w-6xl mx-auto px-8 py-6 space-y-4">
            <div className="flex items-center justify-between gap-4 ">
              <h1 className="text-2xl font-bold">Justification</h1>
              <SelectWeek 
                weeks={weeks}
                handleSelectWeek={handleSelectWeek}
                activeWeek={selectedWeek}
              />
            </div>
            <div className="grid grid-cols-6 gap-4">
              {daysOfWeek.map((day,index) => (
                  <div 
                      key={index} 
                      onClick={() => setSelectedDay(day.day)}
                      className={`
                          px-3 py-2 border  rounded-lg cursor-pointer
                          ${selectedDay === day.day ? 
                            'bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-500 dark:bg-purple-950/50 dark:text-purple-50 dark:border-purple-700' 
                          : 'bg-white hover:bg-gray-50 dark:bg-gray-800  border-gray-300 dark:border-gray-700'
                          }
                      `}
                    >
                       <span className="flex items-center justify-between">
                       <h1 className="text-sm font-medium">{day.day}</h1>
                       { day.day === activeDay ? <span className={`text-xs text-purple-500 `}>Today</span> : null}

                       </span>
                 
                    <p className={`text-sm ${selectedDay === day.day ? 'text-purple-700' : 'text-gray-500 dark:text-gray-400'}`}>{day.date}</p>
                </div>
              ))}

            </div>





            <div className="bg-white dark:bg-gray-800 border border-gray-50 dark:border-gray-700 rounded-lg">
                <TableProvider>
                    <ModalProvider>
                        <Table 
                            tableConfig={config}
                            data={absences}
                            filteredData={absences}
                        />
                    </ModalProvider>  
                </TableProvider>
            </div>
        </div>
    )
}

function getActiveWeek(weeks) {
  const currentDate = new Date();
  
  for (let week of weeks) {
    const weekFrom = new Date(week.from);
    const weekTo = new Date(week.to);

    if (currentDate >= weekFrom && currentDate <= weekTo) {
      return week;
    }
  }
  return null;
}

const getActiveDay = () => {
  const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDate = new Date();

  return daysOfWeek[currentDate.getDay()] === 'Sunday' ? false : daysOfWeek[currentDate.getDay()];
}


function getWeekDates(startDate) {
  const daysOfWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const start = new Date(startDate); // Convert start date to Date object
  let weekDates = [];

  for (let i = 0; i < 7; i++) {
      let currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i); // Add days incrementally
      if(daysOfWeek[currentDate.getDay()] === 'Sunday'){
        continue;
      }

      weekDates.push({
          day: daysOfWeek[currentDate.getDay()], // Get the day name
          date: currentDate.toISOString().split("T")[0] // Format YYYY-MM-DD
      });
  }

  return weekDates;
}

// Get all dates for the week starting from April 1, 2025

