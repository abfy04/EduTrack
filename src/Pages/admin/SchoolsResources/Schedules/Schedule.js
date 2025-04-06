import { useEffect, useState, useCallback } from "react";
import { days, sessions, teacheSscheduleData, roomScheduleData, groupScheduleData } from "../../../../Data/ScheduleData";
import { successNotify } from "../../../../Components/Common/Toast";
import DeleteSessionModal from "./modals/DeleteSessionModal";
import ManagingScheduleModal from "./modals/ManagingScheduleModal";
import ScheduleContainer from "../../../../Components/Schedule/ScheduleContainer";
import { exportScheduleAsPdf } from "../../../../utils/Export/ExportScheduleAsPdf";
import ContextMenu from "./modals/ContextMenu";
import ClearScheduleModal from "./modals/ClearScheduleModal";
import { useParams } from "react-router-dom";
import { rooms, groups, teachers } from "../../../../Data/Users";
import ScheduleHeader from "../../../../Components/Schedule/ScheduleHeader";
import RestoreClearedSchedule from "../../../../Components/Schedule/RestoreClearedSchedule";
import useScheduleVersion from "../../../../utils/Hooks/useScheduleVersion";
import useSessionManagement from "../../../../utils/Hooks/useSessionManaging";
import { useModalState } from "../../../../utils/Hooks/useScheduleModal";
import RenderSessionCell from "../../../../Components/Schedule/RenderCell";
import { rightClick } from "../../../../utils/AdminScheduleFunction/rightClick";
import Events from "../../../../Components/Schedule/Events";

const dataSet = {
    'teacher' : {
        scheduleData : teacheSscheduleData ,
        data : teachers,
        primaryKey  : 'matricule',
        name : 'fullName'
    },
    'group' : {
        scheduleData : groupScheduleData ,
        data : groups,
        primaryKey  : 'idGroup',
        name : 'libel'
    },
    'room' : {
        scheduleData : roomScheduleData ,
        data : rooms,
        primaryKey  : 'idRoom',
        name : 'roomName'
    },
}
export default function Schedule() {
    const {entity,id} = useParams();

    
    const {scheduleData , data , primaryKey,name} = dataSet[entity]
    const scheduleSessions = entity === 'group' ? sessions.filter(session => session.start !== '19:30' ) : sessions
    
    const item = data.find(el => isNaN(Number(id)) ? el[primaryKey] === id : el[primaryKey] === Number(id));

    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

    const {
            activeScheduleVersion, 
            scheduleVersions, 
            goToPreviousVersion, 
            goToNextVersion, 
            getCurrentSchedule,
            addVersion,
            resetScheduleVersions
        } = useScheduleVersion(scheduleData);
   
        const { getModalState, openModal, closeModal, closeAllModals } = useModalState();

        const modal = {closeModal,closeAllModals}
        const versioning = {addVersion,resetScheduleVersions}
        const {
            schedule,
            setSchedule,
            selectedSession,
            setSelectedSession,
            selectedSessionToCopy,
            isScheduleClearedTemporarly,
            addSession,
            deleteSession,
            restoreToOriginal,
            restoreSession,
            copySession,
            cutSession,
            pasteSession,
            replaceSession,
            clearSchedule,
            restoreSchedule,
            handleCancel,
        } = useSessionManagement(getCurrentSchedule() , modal, versioning);

        const handleSaveChanges = () => {
            successNotify('changes saved successfully') 
        };

        const handleExport = () => {
            const success = exportScheduleAsPdf({
                schedule,
                days,
                sessions,
                entityName : item[name]

            });

            if (success) {
                successNotify('Schedule saved & exported successfully');
            }
        }

        const handleRowRightClick = (cell,e) => rightClick(cell,e,selectedSession,setSelectedSession,setContextMenuPosition,openModal);
    
        const resetContextMenu = useCallback(() => {
            setSelectedSession(null);
            closeModal('contextMenu');
        }, [closeModal,setSelectedSession]);

        useEffect(() => {
            const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedSession?.idSession) {  // Fixed typo: 'Espace' → 'Escape'
                resetContextMenu();
            }
            };
            // Add both event listeners
            document.addEventListener('keydown', handleKeyDown);
        
            // Cleanup both event listeners
            return () => {
            document.removeEventListener('keydown', handleKeyDown);
            };
        }, [selectedSession,resetContextMenu]);


    return (
        <div className="max-w-6xl mx-auto py-4">
            {
               isScheduleClearedTemporarly.is_temporary && (
                    <RestoreClearedSchedule 
                        entityName={item?.[name]}
                        isScheduleClearedTemporarly={isScheduleClearedTemporarly}
                        restoreSchedule={restoreSchedule}
                    />
               )
            } 
            {
                !isScheduleClearedTemporarly.is_temporary && (
                <>
                    <ScheduleHeader 
                        handlePreviousVersion={() => setSchedule(goToPreviousVersion())}
                        handleNextVersion={() => setSchedule(goToNextVersion())}
                        activeScheduleVersion={activeScheduleVersion}
                        scheduleVersionsLength={scheduleVersions.length}
                        scheduleLength={schedule.length}
                        handleClearSchedule={() => openModal('clearSchedule')}
                        handleSaveChanges={handleSaveChanges}
                        entityName={item?.[name]}
                       
                        handleExport = {handleExport}
                    />

                    <ScheduleContainer 
                        sessions={scheduleSessions} 
                        days={days} 
                    >
                        {
                            days.map((day,dayIndex)=>
                                scheduleSessions.map((session, sessionIndex) => 
                                <RenderSessionCell 
                                    day={day} 
                                    dayIndex={dayIndex} 
                                    session={session} 
                                    sessionIndex={sessionIndex} 
                                    schedule={schedule} 
                                    entity = {entity}
                                    handleRowRightClick={handleRowRightClick}
                                    entityName={item[entity]}
                                /> 
                            ))
                        }
                    </ScheduleContainer>
                </>
               )
            }
            <Events name={ item?.[name]} />
           
            {getModalState('scheduleManaging') && (
                <ManagingScheduleModal 
                    onCancel={handleCancel}
                    session={selectedSession}
                    handleSubmit={addSession}
                    restoreSession={restoreSession}
                    handleBackToOriginal={restoreToOriginal}
                    entityName={item[name]}
                    entity = {entity}
                    
                />
            )}

            {getModalState('delete') && (
                <DeleteSessionModal 
                    deleteSession={deleteSession}
                    handleCancel={handleCancel}
                    session={selectedSession}
                />
            )}

            {getModalState('clearSchedule') && (
                <ClearScheduleModal 
                    clearSchedule={clearSchedule}
                    handleCancel={handleCancel}
                />
            )}

            {getModalState('contextMenu') && (
                   <div 
                        className="fixed z-50"
                    
                        style={{
                            top: `${contextMenuPosition.top}px`,
                            left: `${contextMenuPosition.left}px`,
                            transformOrigin: 'top'
                        }}
                    >
                       <ContextMenu 
                          
                          handleCopy={copySession}
                          handleCut={cutSession}
                          handlePaste={pasteSession}
                          handleDelete={()=> openModal('delete')}
                          handleReplace={replaceSession}
                          handleModify={()=> openModal('scheduleManaging')}
                          selectedSession={selectedSession}
                          selectedSessionToCopy={selectedSessionToCopy}
                       />
                    </div>
            )}
        </div>
    );
}


