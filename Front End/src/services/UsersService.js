import { BaseAPIGET, BaseAPIPOST } from "../components/Shared/BaseAPI"

export const createUser = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = "createUser"
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        const url = "getUsers"
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const login = (email, password, type) => {
    return new Promise((resolve, reject) => {
        const url = `login?email=${email}&password=${password}&type=${type}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
        const url = `forgotPassword?email=${email}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateAdminProfile = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = "updateAdminProfile"
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}