import { ToastContainer } from "react-toastify";
import { ArrowLeft, ArrowRight, Trash2, Save, Download } from "lucide-react";

export default function ScheduleHeader({handlePreviousVersion, handleNextVersion, activeScheduleVersion, scheduleVersionsLength, scheduleLength, handleClearSchedule, handleSaveChanges, teacherName}) {
    
    return (
        <div className="flex items-center w-full justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-gray-700 dark:text-gray-50">
                                Schedule
                            </h1>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Mr. {teacherName}
                            </span>
                        </div>
                        <ToastContainer pauseOnHover={false} closeButton={false} />
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={handlePreviousVersion}
                                    disabled={activeScheduleVersion === 1}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                        rounded-lg hover:bg-gray-50 focus:outline-none 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        dark:hover:bg-gray-700  transition-colors 
                                        disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                                
                                >
                                    <ArrowLeft size={16} />
                                </button>
                                <button
                                    onClick={handleNextVersion}
                                    disabled={activeScheduleVersion === scheduleVersionsLength}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                        rounded-lg hover:bg-gray-50 
                                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                                        dark:hover:bg-gray-700 transition-colors 
                                        disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                                >
                                
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                            <button 
                                disabled={scheduleLength === 0} 
                                onClick={handleClearSchedule}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 
                                    rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 
                                    disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            >
                                <Trash2 size={16} />
                                Clear Schedule
                            </button>
                            <button 
                                onClick={handleSaveChanges}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 
                                    rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 
                                    transition-colors"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                            <button 
                                onClick={handleSaveChanges}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 
                                    rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 
                                    transition-colors"
                            >
                                <Download size={16} />
                                Export PDF
                            </button>
                        </div>
                    </div>
    )
}