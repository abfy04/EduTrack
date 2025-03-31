// Generate a session cell for the schedule grid
import {FullSession} from "../../Components/Schedule/ScheduleComponents";
import { initialValues,days, sessions } from "../../Data/ScheduleData";


const RenderSessionCell = ({day, dayIndex, session, sessionIndex,schedule,handleRowRightClick}) => {
    const matchingSessions = schedule.find(s => 
        s.day_of_week === day && session.start === s.start_time
    );
    
    const sessionData = {
        ...initialValues,
        idSession: new Date().getTime(),
        day_of_week: day,
        start_time: session.start,
        end_time: session.end, 
    };
    
    const isLastDay = dayIndex === days.length - 1;
    const isOddSession = sessionIndex === 1 || sessionIndex === 3;
    const isEvenSession = sessionIndex === 0 || sessionIndex === 2;
    const isLastSession = sessionIndex === sessions.length - 1;
    
    return (
        <div 
            key={`${dayIndex}-${sessionIndex}`} 
            className={`
                col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                ${!matchingSessions?.idSession && 'hover:bg-purple-50 dark:hover:bg-purple-900/20'}
                ${isOddSession && 'mr-2'}  
                ${isLastDay && isOddSession && 'rounded-br-lg'}
                ${isLastDay && isEvenSession && 'rounded-bl-lg'}
                ${isLastDay && isLastSession && 'rounded-b-lg'}
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700    
                cursor-pointer min-h-16 relative p-1 duration-300 transition-all  
                hover:border-purple-500 dark:hover:border-purple-500
                hover:shadow-sm
            `}
            onContextMenu={(e) => handleRowRightClick(matchingSessions?.idSession ? matchingSessions : sessionData,e)}

        >
            {matchingSessions?.idSession && (
                <FullSession 
                    name={matchingSessions?.group_name} 
                    room={matchingSessions?.type === 'Presentiel' ? matchingSessions?.room_name : 'A distance'} 
                    status={matchingSessions.status}
                />
            )}
        </div>
    );
};

export default RenderSessionCell;