import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from '../../../../utils/Context/ModalContext';
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { TableProvider } from '../../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout';
import { usePage,Link,router } from "@inertiajs/react";

export default function Teachers() {
  const { filieres } = usePage().props;

  useEffect(() => {
    const message = localStorage.getItem('toastMessage');
    if (message) {
      successNotify(message);
      setTimeout(() => {
        localStorage.removeItem('toastMessage');
      }, 3000);
    }
  }, []);

  const config = {
    name: 'filiere',
    actions: true,
    selectabel: false,
    columns: [
      {
        field: 'id',
        header: 'Id Filiere',
      },
      {
        field: 'name',
        header: 'Libel'
      },
      {
        field: 'parent.libel', // nested field
        header: 'Niveau',
        render: (row) => row.parent?.name || '-'
      },
      // {
      //   field: 'numberGroup',
      //   header: 'Number Group',
      // },
      // {
      //   field: 'totalAbsence',
      //   header: 'Total Absence',
      // },
      // {
      //   field: 'Actions',
      //   header: 'Actions',
      // }
    ],
    searchBy: ['name'],
    filterBy: ['parent.libel', 'numberGroup', 'totalAbsence'],
    path: '/schoolResources/filieres',
    links: {
      edit: 'edit',
      profile: 'profile'
    },
    modals: ['delete'],
    primaryKey: 'id'
  };
 const handleDelete = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this filiere?")) {
      router.delete(route('filieres.destroy', 27));
    }
  };
  return (
    
    <SchoolResourcesLayout>
      <div className="py-6 px-8">
        {/* <div className="py-6 px-8">
       <form onSubmit={handleDelete} className="mb-4">
        <button
          type="submit"
          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </form> 
    </div> */}
         <Link href={route('filieres.edit', 25)} className="text-blue-500 hover:underline">
          Edit
        </Link>
        <Link href={route('filieres.show', 5)} className="text-blue-500 hover:underline">
          show
        </Link> 
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-6">
          Filieres
        </h1>
        <TableProvider>
          <ModalProvider>
            <TableContainer
              data={filieres}
              tableConfig={config}
              title={'Filieres'}
            />
          </ModalProvider>
        </TableProvider>
      </div>
    </SchoolResourcesLayout>
  );
}
