import axios from 'axios'
import { store } from "../rtk/store";
import { setLoading } from "../rtk/features/loaderSlice";

const switchLoader = (isLoading: boolean) => {
    store.dispatch(setLoading({ isLoading }));
}

axios.interceptors.request.use(function (config) {
    switchLoader(true)
    return config;
}, function (error) {
    switchLoader(false)
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    switchLoader(false)
    return response;
}, function (error) {
    switchLoader(false)
    return Promise.reject(error);
});

export default axios