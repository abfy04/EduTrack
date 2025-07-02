import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from '../../../../utils/Context/ModalContext';
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { TableProvider } from '../../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout';
import { usePage, Link, router } from "@inertiajs/react";

export default function Groups() {
  const { groups } = usePage().props;

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
    name: 'group',
    actions: true,
    selectable: false,
    columns: [
      {
        field: 'idGroup',
        header: 'ID Group',
      },
      {
        field: 'libel',
        header: 'Group Name'
      },
      {
        field: 'year',
        header: 'Year'
      },
      {
        field: 'filiere',
        header: 'Field of Study',
        render: (row) => row.filiere?.name || '-' // Display nested filiere name if available
      }
    ],
    searchBy: ['libel', 'year', 'filiere.name'],
    filterBy: ['year', 'filiere.name'],
    path: '/schoolResources/groups',
    links: {
      edit: 'edit',
      profile: 'profile'
    },
    modals: ['delete'],
    primaryKey: 'idGroup'
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this group?")) {
      router.delete(route('groups.destroy', id));
    }
  };
console.log("Groups data:", groups);

  return (
    <SchoolResourcesLayout>
      <div className="py-6 px-8">
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-50">
            Groups
          </h1>
          
        </div>
        <TableProvider>
          <ModalProvider>
            <TableContainer
              data={groups}
              tableConfig={config}
              title={'Groups List'}
            />
          </ModalProvider>
        </TableProvider>
      </div>
    </SchoolResourcesLayout>
  );
}