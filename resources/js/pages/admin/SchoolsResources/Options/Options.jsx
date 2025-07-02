import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from "../../../../utils/Context/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { TableProvider } from '../../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout';
import { usePage, Link, router } from "@inertiajs/react";

export default function Options() {
    const { options } = usePage().props;

    useEffect(() => {
      const message = localStorage.getItem('toastMessage');
      if(message) {
        successNotify(message);
        setTimeout(() => {
          localStorage.removeItem('toastMessage');
        }, 3000);
      }
    }, []);

    const config = {
        name: 'options',
        actions: true,
        selectable: false,
        columns: [
            { 
                field: 'id', 
                header: 'ID',
            },
            { 
                field: 'name', 
                header: 'Option Name'
            },
            { 
                field: 'year', 
                header: 'Year',
                render: (row) => {
                    // Get the immediate parent (Year)
                    const year = row.parent;
                    return year?.name || '-';
                }
            },
            { 
                field: 'field', 
                header: 'Field',
                render: (row) => {
                    // Get the Field by going up two levels (Option -> Year -> Field)
                    const year = row.parent;
                    const field = year?.parent;
                    return field?.name || '-';
                }
            },
            { 
                field: 'level', 
                header: 'Level',
                render: (row) => {
                    // Get the Level by going up three levels (Option -> Year -> Field -> Level)
                    const year = row.parent;
                    const field = year?.parent;
                    const level = field?.parent;
                    return level?.name || '-';
                }
            },
            // { 
            //     field: 'Actions',
            //     header: 'Actions',
            //     render: (row) => (
            //         <div className="flex space-x-2">
            //             <Link 
            //                 href={route('options.edit', row.id)} 
            //                 className="text-blue-500 hover:underline"
            //             >
            //                 Edit
            //             </Link>
            //             <button
            //                 onClick={(e) => handleDelete(row.id, e)}
            //                 className="text-red-500 hover:underline"
            //             >
            //                 Delete
            //             </button>
            //         </div>
            //     )
            // }
        ], 
        searchBy: ['name'],
        filterBy: ['year.name', 'field.name'],
        path: '/schoolResources/options',
        links: {
            edit: 'options.edit',
            show: 'options.show'
        },
        modals: ['delete'],
        primaryKey: 'id'
    };

    const handleDelete = (id, e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this option?")) {
            router.delete(route('options.destroy', id));
        }
    };

    return (
        <SchoolResourcesLayout>
            <div className="py-6 px-8 max-w-screen-2xl mx-auto">
                <ToastContainer pauseOnHover={false} closeButton={false} />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-lg 2xl:text-2xl font-semibold text-gray-700 dark:text-gray-50">
                        Options
                    </h1>
                </div>
                <TableProvider>
                    <ModalProvider>
                        <TableContainer 
                            data={options}
                            tableConfig={config}
                            title={'Options List'}
                        />
                    </ModalProvider>
                </TableProvider>
            </div>
        </SchoolResourcesLayout>
    );
};