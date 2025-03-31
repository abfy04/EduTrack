import { File, Upload, } from "lucide-react"
import { ToastContainer } from "react-toastify"
import {successNotify } from "../../../../Components/Common/Toast"
import {Form , FormContainer} from "../../../../Components/form/GlobalComponents"
import useForm from "../../../../utils/Hooks/useForm"
import { CustomSelect } from "../../../../Components/form/CustomSelect";
import { TextField } from "../../../../Components/form/Inputs";

export default function ImportStudents({ groups }) {
  const initialValues = {
    file : '',
    group : ''
  }

  const {values,errors,handleChange,handleSubmit,isFormValid}= useForm(initialValues,{},'add')

  const onSubmit = () => {
    successNotify("students imported  seccussfully" );
  };

  return (
    <>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <Form
           submitBtnIsDisabled={!isFormValid}
           submitBtnTitle={'Import Students'}
           submitFunction={handleSubmit(onSubmit)}
           maxWidth="md:max-w-3xl pb-4"
        >
          <div className="  w-full space-y-4">
            {/* personal info */}
            <FormContainer title="Import Students" icon={Upload}>
                <TextField 
                  error={errors.file}
                  name={'file'}
                  label={'File'}
                  value={values.file}
                  placeHolder={"file"}
                  icon={File}

                  handleChange={handleChange}
                  handleFocus={()=>{}}
            
                 
                  
                />
                <CustomSelect 
                  name={'group'}
                  label={'Group'}
                  placeholder={'Select students group'}
                  handleChange={handleChange}
                  items={groups}
                  value={values.group}
                  position={'top'}
                />
                    

               
            </FormContainer>


          </div>
        </Form>
      
    </>
  );
}