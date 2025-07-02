import { Presentation, School, ArrowLeft } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import { CustomSelect } from "../../../Components/form/CustomSelect";
import { RatioField } from "../../../Components/form/RatioField";
import { TextField } from "../../../Components/form/Inputs";
import { Form, FormContainer } from "../../../Components/form/GlobalComponents";
import { useState } from "react";
import ConfirmAddModal from "../../../Components/Modals/ConfirmAdding";
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';

export default function AddOptions() {
  const [isConfirmAddingOpen, setIsConfirmAddingOpen] = useState(false);

  const { errors: inertiaErrors, filieres = [], years = [], options = [] } = usePage().props;

  const filiereOptions = filieres.map(item => ({ option: item.name, value: item.id, par: item.parent_id }));
  const yearOptions = years.map(item => ({ option: item.name, value: item.id, par: item.parent_id }));
  const optionOptions = options.map(item => ({ option: item.name, value: item.id, par: item.parent_id }));



  const { data, setData, post, reset, processing } = useForm({
    libel: '',
    filiere: '',
    year: '',
    option: ''
  });
const filteredYears = yearOptions.filter(item => item.par === parseInt(data.filiere));
const filteredOptions = optionOptions.filter(item => item.par === parseInt(data.year));
  const validations = {
    libel: {
      message: 'The libel should not contain symbols',
      regex: /^[A-Za-z]+\d*$/
    }
  };

  const [localErrors, setLocalErrors] = useState({});

  const validateField = (name, value) => {
    if (validations[name]) {
      if (!validations[name].regex.test(value)) {
        setLocalErrors(prev => ({ ...prev, [name]: validations[name].message }));
        return false;
      }
    }
    setLocalErrors(prev => ({ ...prev, [name]: '' }));
    return true;
  };

  const handleChange = (eOrName, value) => {
    const name = typeof eOrName === 'object' ? eOrName.target.name : eOrName;
    const val = typeof eOrName === 'object' ? eOrName.target.value : value;

    // Reset dependent selects
    if (name === 'filiere') {
      setData({ ...data, filiere: val, year: '', option: '' });
    } else if (name === 'year') {
      setData({ ...data, year: val, option: '' });
    } else {
      setData(name, val);
    }

    validateField(name, val);
  };

  const handleFocus = (name) => {
    setLocalErrors(prev => ({ ...prev, [name]: '' }));
  };

  const isSubmitDisabled = () => {
    return !data.libel || !data.filiere || !data.year || localErrors.libel || processing;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsConfirmAddingOpen(true);
  };

  const handleConfirm = () => {
    post(route('options.store'), {
      onSuccess: () => {
        toast.success('Options added successfully');
        reset();
      },
      onError: () => {
        toast.error('Failed to add option');
      }
    });
  };

  const handleClose = () => {
    reset();
    setIsConfirmAddingOpen(false);
  };

  return (
    <>
      <SchoolResourcesLayout>
        <div className="mb-4 mt-4 px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <School size={24} strokeWidth={2.5} />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add new Option</h1>
          </div>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <Form
          submitBtnIsDisabled={isSubmitDisabled()}
          submitBtnTitle={'Add Option'}
          submitFunction={onSubmit}
          maxWidth="md:max-w-3xl pb-4"
        >
          <FormContainer title={'Option Information'} icon={Presentation}>
            <TextField
              error={localErrors.libel || inertiaErrors.libel}
              name={'libel'}
              label={'Libel'}
              value={data.libel}
              handleChange={handleChange}
              handleFocus={() => handleFocus('libel')}
              placeHolder={'Option Libel'}
              icon={Presentation}
            />
            <CustomSelect
              name="filiere"
              label="Filiere"
              placeholder="Select filiere"
              handleChange={handleChange}
              items={filiereOptions}
              value={data.filiere}
              error={inertiaErrors.filiere}
            />
            <CustomSelect
              name="year"
              label="Year"
              placeholder="Select year"
              handleChange={handleChange}
              items={filteredYears}
              value={data.year}
              error={inertiaErrors.year}
            />
            
          </FormContainer>
        </Form>
        <ConfirmAddModal
          isOpen={isConfirmAddingOpen}
          onConfirm={handleConfirm}
          onClose={handleClose}
          itemName={'option'}
          confirmText="Confirm option adding"
          cancelText="Cancel adding"
        />
      </SchoolResourcesLayout>
    </>
  );
}
