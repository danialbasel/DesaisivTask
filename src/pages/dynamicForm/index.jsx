import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';

import { Button } from '@mui/material';

import PasswordInput from '../../components/passwordInput';
import Input from '../../components/input';
import SelectInput from '../../components/selectInput';

import Styles from './dynamicForm.module.css';

const ConnectForm = ({ children }) => {
    const methods = useFormContext();
    return { ...children, ...methods };
}

const DynamicForm = () => {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const methods = useForm();
    const loaderData = useLoaderData()
    
    const onSubmit = (data) => alert(JSON.stringify(data))

    return (
        <FormProvider {...methods}>
            <div className={Styles.fromWrapper} >
                <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={Styles.formHeader}>Dynamic Form</h1>
                    {loaderData.map((item, index) => {
                        let input;
                        switch (item.type) {
                            case 'password':
                                input = (field) => { return <PasswordInput errors={errors} field={field} {...item} /> }
                                break;
                            case 'text':
                            case 'number':
                            case 'date':
                                input = (field) => { return <Input errors={errors} field={field} {...item} /> }
                                break;
                            case 'select':
                                input = (field) => { return <SelectInput errors={errors} field={field} {...item} /> }
                                break;
                            default:
                                return <p key={index}>Invalid Input Type</p>
                        }
                        return (
                            <ConnectForm key={item.name} >
                                <Controller
                                    name={item.name}
                                    control={control}
                                    rules={{ required: item.required }}
                                    render={({ field }) => input(field)} />
                            </ConnectForm>
                        )
                    })}
                    <Button type='submit' variant="contained">Submit</Button>
                </form>
            </div>
        </FormProvider>
    )
}

export default DynamicForm;