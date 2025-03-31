import { useEffect, useState, useCallback } from "react";
import { days, sessions, scheduleData } from "../../../../Data/ScheduleData";
import { successNotify } from "../../../../Components/Common/Toast";
import DeleteSessionModal from "./DeleteSessionModal";
import ManagingScheduleModal from "./ManagingScheduleModal";
import ScheduleContainer from "../../../../Components/Schedule/ScheduleContainer";
import { exportScheduleAsPdf } from "../../../../utils/Export/ExportScheduleAsPdf";
import ContextMenu from "./ContextMenu";
import ClearScheduleModal from "./ClearScheduleModal";
import { useParams } from "react-router-dom";
import { users } from "../../../../Data/Users";
import ScheduleHeader from "../../../../Components/Schedule/ScheduleHeader";
import RestoreClearedSchedule from "../../../../Components/Schedule/RestoreClearedSchedule";
import useScheduleVersion from "../../../../utils/Hooks/useScheduleVersion";
import useSessionManagement from "../../../../utils/Hooks/useSessionManaging";
import { useModalState } from "../../../../utils/Hooks/useScheduleModal";
import RenderSessionCell from "../../../../Components/Schedule/RenderCell";
import { rightClick } from "../../../../utils/AdminScheduleFunction/rightClick";
export default function Schedule() {
    const {matricule} = useParams();
    const teacher = users.find(user => user.matricule === matricule);
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
            const success = exportScheduleAsPdf({
                schedule,
                days,
                sessions,
                teacherName: teacher?.fullName
            });

            if (success) {
                successNotify('Schedule exported successfully');
            }
        };

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
        <div className="max-w-6xl mx-auto pt-4">
            {
               isScheduleClearedTemporarly.is_temporary && (
                    <RestoreClearedSchedule 
                        teacherName={teacher?.fullName}
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
                        teacherName={teacher?.fullName}
                    />

                    <ScheduleContainer 
                        sessions={sessions} 
                        days={days} 
                    >
                        {
                            days.map((day,dayIndex)=>
                                sessions.map((session, sessionIndex) => 
                                <RenderSessionCell 
                                    day={day} 
                                    dayIndex={dayIndex} 
                                    session={session} 
                                    sessionIndex={sessionIndex} 
                                    schedule={schedule} 
                                    handleRowRightClick={handleRowRightClick}
                                /> 
                            ))
                        }
                    </ScheduleContainer>
                </>
               )
            }
           
            {getModalState('scheduleManaging') && (
                <ManagingScheduleModal 
                    onCancel={handleCancel}
                    session={selectedSession}
                    handleSubmit={addSession}
                    restoreSession={restoreSession}
                    handleBackToOriginal={restoreToOriginal}
                    teacherName={teacher?.fullName}
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


