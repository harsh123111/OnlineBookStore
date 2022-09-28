import { BaseAPIGET } from "../components/Shared/BaseAPI"

export const getFeedbacks = () => {
    return new Promise((resolve, reject) => {
        const url = "getFeedbacks"
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const addFeedback = (userId, feedback) => {
    return new Promise((resolve, reject) => {
        const url = `addFeedback?userId=${userId}&feedback=${feedback}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const deleteFeedback = (id) => {
    return new Promise((resolve, reject) => {
        const url = `deleteFeedback?id=${id}`
        const method = "DELETE"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}