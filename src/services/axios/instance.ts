import axios, { AxiosInstance } from 'axios';

export const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    return instance;
};
