import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getJobsByFilter = async ({title, skills})=> {
    const params = {
        title,
    };

    if(skills.length) params.skills = skills.toString();
    
    try {
        const response = await axios.get(`${backendUrl}/jobs`, {
            params: {
                ...params,
            }
        });

        const {jobs} = response.data.data;
        return {data: jobs, error: ""}

    } catch (error) {
        return {data: null, error: "Something went wrong!"}
    }
}


export const getJobPost = async (jobId)=> {

    try {
        const response = await axios.get(`${backendUrl}/jobs/${jobId}`);

        const {job} = response.data.data;
        return {data: job, error: ""}

    } catch (error) {
        return {data: null, error: error?.response?.data?.message || "Something went wrong!"}
    }
}

export const createJobPost = async (jobData)=> {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await axios.post(`${backendUrl}/jobs`, 
        {
            ...jobData
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const {job} = response.data.data;
        return {data: job, error: ""}

    } catch (error) {
        return {data: null, error: "Something went wrong!"}
    }
}

export const updateJobPost = async (jobData, jobId)=> {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await axios.put(`${backendUrl}/jobs/${jobId}`, 
        {
            ...jobData
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const {job} = response.data.data;
        return {data: job, error: ""}

    } catch (error) {
        return {data: null, error: "Something went wrong!"}
    }
}