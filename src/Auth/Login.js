import { Select } from '../Components/form/Select';

import {PasswordField , TextField} from '../Components/form/Inputs'
import {Form ,FormContainer} from '../Components/form/GlobalComponents'
import useForm from '../utils/Hooks/useForm'
import { ClipboardList, User,Mail } from "lucide-react";


export default function Login({setRole}){
  
    // const initValue = {
    //     email : '',
    //     password : '',
    // }
    // const validation = {
    //     email : {
    //       regex : /^[a-zA-Z0-9._%+-]+@ofppt\.[a-zA-Z]{2,}$/ ,
    //       message : 'invalid email , enter profetionnal email'
    //     },
    //     password : {
    //       message : 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols',
    //       regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/
    //     },

    //   }
    const initValue = {
        role : ''
    }
    const {values ,handleChange,handleSubmit,isSubmitDisabled} = useForm(initValue,{},'add')
    const onSubmit = ()=>{
        setRole(values.role)
        localStorage.setItem('userRole',values.role)
        
    }
    return (
        <div className="w-full flex justify-center items-center min-h-screen ">
            <div className="  w-1/2">
                <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-50 mb-10">
                    <ClipboardList size={32}/>
                    <h2 className="text-2xl font-bold">EduTrack</h2>
                </div>
                <Form
                submitBtnIsDisabled={isSubmitDisabled()}
                submitBtnTitle={'Login'}
                submitFunction={handleSubmit(onSubmit)}
                >
                    <FormContainer title={'Login to your Account'} icon={User} >
                        {/* <TextField 
                            type="email"
                            error={errors.email}
                            name={'email'}
                            label={'Professional Email'}
                            value={values.email}
                            handleChange={handleChange}
                            handleFocus={handleFocus}
                            placeHolder={"User's professional email"}
                            icon={Mail}
                    
                        />
                        <PasswordField 
                            error={errors.password}
                            name={'password'}
                            label={'Password'}
                            value={values.password}
                            handleChange={handleChange}
                            handleFocus={handleFocus}
                            placeHolder={"Enter users's password"}
                        /> */}
                        <Select
                        label={'Select Your Role'}
                        name={'role'}
                        handleChange={handleChange}
                        placeholder={'select role'}
                        value={values.role}
                        items={['Admin','Absence Manager','Teacher']}

                        />

                    </FormContainer>
                </Form>
            </div> 
        </div>
    )
}