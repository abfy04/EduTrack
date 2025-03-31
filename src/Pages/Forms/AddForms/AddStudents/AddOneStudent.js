

import { BriefcaseBusiness,  KeyRound, Mail, User, ArrowLeft, GraduationCap } from "lucide-react";
import {  useNavigate, } from "react-router-dom";
import {Form , FormContainer} from "../../../../Components/form/GlobalComponents";
import useForm from "../../../../utils/Hooks/useForm";
import {  RatioField } from "../../../../Components/form/RatioField";
import { CustomSelect } from "../../../../Components/form/CustomSelect";
import { DateField } from "../../../../Components/form/Fields";
import {  TextField,PasswordField } from "../../../../Components/form/Inputs";


export default function AddOneStudent({groups}){
  
  const nv= useNavigate()
  const initialValues = {
    fullName : '',
    birthDate : '',
    gender : '',
    cef : '',
    email : '',
    group : '',
    password : '',
    confirmPassword : ''
  }
  const validation = {
    fullName : {
      message : 'The name should not contain symbols or numbers',
      regex : /^[A-Za-z]+$/
    },
    birthday : {
      message : 'The age should be between 18 and 65',
      validateFunc: (birthDate) => {
        const age = calculateAge(birthDate);
        return age >= 18 && age <= 65;
      },
    },
    cef : {
      message : 'The cef should not contain symbold',
      regex : /^\d+$/
    },
    email : {
      regex : /^[a-zA-Z0-9._%+-]+@ofppt\.[a-zA-Z]{2,}$/ ,
      message : 'invalid email , enter profetionnal email'
    },
    password : {
      message : 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols',
      regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/
    },
    confirmPassword : {
      message : 'The passwords do not match. Please make sure both password fields are identical.',
      check : 'password'
    }
  }
 
  const {values,errors,handleChange,handleFocus,handleSubmit,isFormValid}= useForm(initialValues,validation,'add')
  const onSubmit = ()=>{
    localStorage.setItem('toastMessage', 'student added seccussfully');
    nv(-1) 
  }
  
    return (
      <> 
        
    
        <Form
           submitBtnIsDisabled={!isFormValid}
           submitBtnTitle={'Add User'}
           submitFunction={handleSubmit(onSubmit)}
           maxWidth="md:max-w-3xl pb-4"
        >
          <div className="  w-full space-y-4">
            {/* personal info */}
            <FormContainer title="Personal Information" icon={User}>
                <TextField 
                  error={errors.fullName}
                  name={'fullName'}
                  label={'Full Name'}
                  value={values.fullName}
                  placeHolder={"user's full name"}
                  icon={User}

                  handleChange={handleChange}
                  handleFocus={handleFocus}
            
                 
                  
                />
                
                    
                    <DateField 
                       name={'birthday'}
                       label={'BirthDay'}
                       handleChange={handleChange}
                       error={errors.birthday}
                       value={values.birthday}
                       handleFocus={handleFocus}
                 

                    />
                    <RatioField 
                        name={'gender'}
                        label={'Gender'}
                        items={['Male','Female']}
                        handleChange={handleChange}
                        value={values.gender}
                    />
               
            </FormContainer>

            {/* Professional info */}
            <FormContainer title="Professional Information" icon={BriefcaseBusiness}>
            <div className=' flex  gap-2 w-full'>
                  <TextField 
                    error={errors.cef}
                    name={'cef'}
                    label={'Cef'}
                    value={values.cef}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"Student's cef"}
                    icon={KeyRound}
                
                  />
                   <TextField 
                  type="email"
                  error={errors.email}
                  name={'email'}
                  label={'Professional Email'}
                  value={values.email}
                  handleChange={handleChange}
                  handleFocus={handleFocus}
                  placeHolder={"Student's professional email"}
                  icon={Mail}
               
                />
               
                 

                </div>
              <CustomSelect 
                name={'group'}
                label={'Group'}
                placeholder={'Select student group'}
                handleChange={handleChange}
                items={groups}
                value={values.group}
                position={'top'}
              />
                
               
                <div className=' flex  gap-2 w-full'>
                <PasswordField 
                    error={errors.password}
                    name={'password'}
                    label={'Password'}
                    value={values.password}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"Enter student's password"}
                 
                 
                />
                <PasswordField 
                    error={errors.confirmPassword}
                    name={'confirmPassword'}
                    label={'Confirm Password '}
                    value={values.confirmPassword}
                    handleChange={handleChange}
                    handleFocus={handleFocus}
                    placeHolder={"Confirm student's password"}  
                />

                </div>
  
            </FormContainer>
          </div>
        </Form>
      </>
    );
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  // Adjust if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}