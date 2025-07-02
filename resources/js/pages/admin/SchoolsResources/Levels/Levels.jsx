import TableContainer from '../../../../Components/table/TableContainer'
import { ModalProvider } from "../../../../utils/Context/ModalContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { successNotify } from "../../../../Components/Common/Toast";
import { TableProvider } from '../../../../utils/Context/TableContext';
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout';
import { usePage, Link, router } from "@inertiajs/react";

export default function Levels() {
    const { levels } = usePage().props;
    
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
        name: 'level',
        actions: true,
        selectable: false,
        columns: [
            { 
                field: 'id', 
                header: 'ID',
            },
            { 
                field: 'name', 
                header: 'Level Name'
            },
            
            // { 
            //     field: 'Actions',
            //     header: 'Actions',
            //     render: (row) => (
            //         <div className="flex space-x-2">
            //             {/* <Link 
            //                 href={route('levels.edit', row.id)} 
            //                 className="text-blue-500 hover:underline"
            //             >
            //                 Edit
            //             </Link> */}
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
        filterBy: ['school_structure_unit_id'],
        path: '/schoolResources/levels',
        links: {
            edit: 'edit',
            show: 'show'
        },
        modals: ['delete'],
        primaryKey: 'id'
    };

    const handleDelete = (id, e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this level?")) {
            router.delete(route('levels.destroy', id));
        }
    };

    return (
        <SchoolResourcesLayout>
            <div className="py-6 px-8 max-w-screen-2xl mx-auto">
                <ToastContainer pauseOnHover={false} closeButton={false} />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-lg 2xl:text-2xl font-semibold text-gray-700 dark:text-gray-50">
                        Levels
                    </h1>
                    
                </div>
                <TableProvider>
                    <ModalProvider>
                        <TableContainer 
                            data={levels}
                            tableConfig={config}
                            title={'Levels'}
                        />
                    </ModalProvider>
                </TableProvider>
            </div>
        </SchoolResourcesLayout>
    );
};