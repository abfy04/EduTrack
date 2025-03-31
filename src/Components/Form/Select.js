import { FieldContainer } from "./GlobalComponents"
export const Select = ({label ,handleChange , placeholder ,name , value,items}) =>{
    return (
        <FieldContainer label={label}>
             <select
                value={value}
                onChange={({target}) => handleChange(name,target.value)}
                className={`
                bg-gray-50 dark:bg-gray-800/70
                block px-4 py-2 w-full appearance-none  rounded-lg 
                ${!value && 'text-gray-300 dark:text-gray-600'}
               
                border border-gray-300 dark:border-gray-600 
                focus:outline-none focus:ring-0 focus:border-purple-600 dark:focus:border-purple-600`}
              >
                <option value="" disabled selected className="text-gray-300 dark:text-gray-600">{placeholder}</option>
                {
                    items.map (item =>  
                    <option key={item} className="text-gray-700 dark:text-gray-50" value={item}>
                      {item}
                    </option>
                    )
                }
              </select>
        </FieldContainer>
    )
}