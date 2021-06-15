import axios from 'axios';
import {apiUrl} from "config";

axios.defaults.withCredentials = true;

export default class {
    public static someRequest = () => {
        return axios.get(`${apiUrl}`);
    }
};
