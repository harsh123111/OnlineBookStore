import { BaseAPIGET } from "../components/Shared/BaseAPI"

export const getComment = (bookId) => {
    return new Promise((resolve, reject) => {
        const url = `getComments?bookId=${bookId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export const addComment = (userId, bookId, comment, date) => {
    return new Promise((resolve, reject) => {
        const url = `addComment?userId=${userId}&bookId=${bookId}&comment=${comment}&date=${date}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}