import { Button } from '@mui/material';
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import PasswordInput from '../../components/passwordInput';
import Input from '../../components/input';
import SelectInput from '../../components/selectInput';
import Styles from './dynamicForm.module.css';

const forms = [{
    name: 'password',
    type: 'password',
    label: 'password test',
    required: false,
},
{
    name: 'text',
    type: 'text',
    label: 'text test',
    required: false,
},
{
    name: 'number',
    type: 'number',
    label: 'number test',
    required: false,
},
{
    name: 'date',
    type: 'date',
    label: '',
    required: false,
},
{
    name: 'select',
    type: 'select',
    label: 'select test',
    items: [{ value: 1, label: 'item1' }, { value: 2, label: 'item2' }, { value: 3, label: 'item3' }],
}]

const ConnectForm = ({ children }) => {
    const methods = useFormContext();
    return { ...children, ...methods };
}

const DynamicForm = () => {
    const { handleSubmit, control } = useForm();
    const methods = useForm();

    const onSubmit = (data) => console.log(data)
    console.count('counter')
    return (
        <FormProvider {...methods}>
            <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                {forms.map((item, index) => {
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
                <Button size='large' type='submit' variant="outlined">Login</Button>
            </form>
        </FormProvider>
    )
}

export default DynamicForm;