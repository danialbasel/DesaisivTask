import api from "./api"

const TableService = {
    GetRows: async (params) => {
        try {
            const paramsString = new URLSearchParams(params).toString();
            console.log(paramsString);
            const rowData = (await api.get(`/users?${paramsString}`)).data;
            return rowData
        } catch (e) {
            //handle error
        }
    },
    LoadMore: async (params) => {
        try {
            const paramsString = new URLSearchParams(params).toString();
            const rowData = (await api.get(`/users?${paramsString}`)).data;
            return rowData
        } catch (e) {
            //handle error
        }
    }
}

export default TableService;