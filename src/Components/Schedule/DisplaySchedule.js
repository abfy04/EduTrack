import { days, sessions } from "../../Data/ScheduleData"
import ScheduleContainer from "./ScheduleContainer"
import { FullSession } from "./ScheduleComponents"

export default function DisplaySchedule({ 
    data,
    type, // 'teacher', 'group', or 'room'
      
}) {
    const renderSessionCell = (day, dayIndex, session, sessionIndex) => {
        const matchingSessions = data.find(s => 
            s.day_of_week === day && session.start === s.start_time
        );
       
        
        
        const isLastDay = dayIndex === days.length - 1;
        const isOddSession = sessionIndex === 1 || sessionIndex === 3;
        const isEvenSession = sessionIndex === 0 || sessionIndex === 2;
        const isLastSession = sessionIndex === sessions.length - 1;
        const roomName = matchingSessions?.room_name || 'A distance';
        return (
            <div 
                key={`${dayIndex}-${sessionIndex}`} 
                className={`
                    col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
                    ${sessionIndex === 3 && type !== 'group' && 'mr-2'}  
                    ${sessionIndex === 1 && 'mr-2'}
                    ${isLastDay && isOddSession && 'rounded-br-lg'}
                    ${isLastDay && isEvenSession && 'rounded-bl-lg'}
                    ${isLastDay && isLastSession && 'rounded-b-lg'}
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700    
                    cursor-pointer min-h-14 relative p-1 
                    
                `}
            >
                {matchingSessions?.id && (
                    <FullSession 
                        name={type === 'teacher' ? matchingSessions.group_name :
                              type === 'group' ? matchingSessions.teacher_name :
                              matchingSessions.group_name}
                        room={type === 'teacher' ? roomName :
                              type === 'group' ? roomName :
                              matchingSessions.teacher_name}
                        status={matchingSessions.status}
                    />
                )}
            </div>
        );
    };

    // Filter sessions based on type
    const filteredSessions = type === 'group' 
        ? sessions.filter(s => s.start !== '19:30') // Remove evening session for groups
        : sessions;

    return (
       
          
            
            <div className="bg-white dark:bg-gray-800 ">
                <ScheduleContainer sessions={filteredSessions} days={days}>
                    {days.map((day, dayIndex) =>
                        filteredSessions.map((session, sessionIndex) =>
                            renderSessionCell(day, dayIndex, session, sessionIndex)
                        )
                    )}
                </ScheduleContainer>
            </div>
        
    );
} 