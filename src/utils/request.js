import axios from 'axios';

const axiosInstance = axios.create({
    timeout: 15000,
})

axiosInstance.interceptors.request.use(
    req => {
        // console.log(req)
        req.headers.token = 'aaabbbccc';
        return req;
    },
    err => {
        console.log(err);
    }
)

axiosInstance.interceptors.response.use(
    res => {
        const data = {
            code: res.status,
            data: res.data,
        }
        return data;
    },
    err => {
        console.log(err);
    }
)

export const get = async url => {
    const res = await axiosInstance.get(url);
    return res;
}

export const post = async (url, param) => {
    const res = await axiosInstance.post(url, param);
    return res;
}