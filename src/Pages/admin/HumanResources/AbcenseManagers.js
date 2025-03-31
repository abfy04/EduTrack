import {users} from '../../../Data/Users'
import { ModalProvider } from "../../../utils/Context/ModalContext";
import TableContainer from "../../../Components/table/TableContainer";
import { TableProvider } from '../../../utils/Context/TableContext';

export default function AbcenseManagers(){
  const config = {
   name : 'absence Manager',
   actions :true,
   selectabel : false,
   columns : [
     { 
       field: 'matricule', 
       header: 'Matricule',
     },
     { 
       field: 'fullName', 
       header: 'Full Name'
     },
     { 
       field: 'age', 
       header: 'Age'
     },
     { 
       field: 'gender', 
       header: 'Gender',
     },
     { 
       field: 'email', 
       header: 'Email',
       width : '2fr'
     }
   ],
   searchBy : ['matricule','fullName'],
   filterBy : ['gender','age'],
   path : '/humanResources',
   links:{
     edit:'editUser'
   },
   modals : ['resetPassword','delete'],
   primaryKey : 'matricule'
  }
  const absenceManagers = users.filter(user => user.role === 'Absence Manager')

 return (
  <div className="py-6 px-8">
      <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
        Absence Managers
      </h1>
      <TableProvider>
        <ModalProvider>
          <TableContainer 
            data={absenceManagers}
            tableConfig = {config}
            title={'Absence Managers'}
          />
        </ModalProvider>
      </TableProvider>
   </div>
 );
};
