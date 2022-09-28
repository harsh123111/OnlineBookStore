import { BaseAPIGET } from "../components/Shared/BaseAPI"

export const createPublisher = (PublisherName) => {
    return new Promise((resolve, reject) => {
        const url = `insertPublisher?publisherName=${PublisherName}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const deletePublisher = (id) => {
    return new Promise((resolve, reject) => {
        const url = `deletePublisher?id=${id}`
        const method = "DELETE"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updatePublisher = (id, publisherName) => {
    return new Promise((resolve, reject) => {
        const url = `updatePublisher?publisherName=${publisherName}&id=${id}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getPublishers = () => {
    return new Promise((resolve, reject) => {
        const url = `getPublishers`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}