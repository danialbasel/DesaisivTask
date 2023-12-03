import Forms from "./DynamicForms.json"

const DynamicFormService = {
    GetForms:async () => {   
        return new Promise((resolve, reject) => {
            setTimeout( () => {
                resolve(Forms);
            }, 2000);
        });
    },
}

export default DynamicFormService;