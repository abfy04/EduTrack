import Table from "../../Components/table/Table"
import { absences } from "../../Data/AbsenceData"
import { ModalProvider } from "../../utils/Context/ModalContext"  
import { TableProvider } from "../../utils/Context/TableContext"
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
    return(
        <div className=" max-w-6xl mx-auto px-8 py-6">
            <h1>Justification</h1>
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
