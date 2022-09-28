import { BaseAPIGET, BaseAPIPOST } from "../components/Shared/BaseAPI"

export const addAdmin = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = `addAdmin`
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export const getAdmins = () => {
    return new Promise((resolve, reject) => {
        const url = `getAdmins`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateAdmin = (adminId, accessId, isDeleted) => {
    return new Promise((resolve, reject) => {
        const url = `updateAdmin?isDeleted=${isDeleted}&adminId=${adminId}&accessId=${accessId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}