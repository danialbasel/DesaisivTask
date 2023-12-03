import { Button } from '@mui/material';
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import PasswordInput from '../../components/passwordInput';
import Input from '../../components/input';
import SelectInput from '../../components/selectInput';
import Styles from './dynamicForm.module.css';
import { useLoaderData } from 'react-router-dom';

const ConnectForm = ({ children }) => {
    const methods = useFormContext();
    return { ...children, ...methods };
}

const DynamicForm = () => {
    const { handleSubmit, control } = useForm();
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
                                input = (field) => { return <PasswordInput field={field} {...item} /> }
                                break;
                            case 'text':
                            case 'number':
                            case 'date':
                                input = (field) => { return <Input field={field} {...item} /> }
                                break;
                            case 'select':
                                input = (field) => { return <SelectInput field={field} {...item} /> }
                                break;
                            default:
                                return <p key={index}>Invalid Type</p>
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