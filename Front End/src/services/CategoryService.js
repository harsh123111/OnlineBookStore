import { BaseAPIGET } from "../components/Shared/BaseAPI"

export const createCategory = (categoryName) => {
    return new Promise((resolve, reject) => {
        const url = `insertCategory?categoryName=${categoryName}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        const url = `deleteCategory?id=${id}`
        const method = "DELETE"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateCategory = (id, categoryName) => {
    return new Promise((resolve, reject) => {
        const url = `updateCategory?categoryName=${categoryName}&id=${id}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getCategories = () => {
    return new Promise((resolve, reject) => {
        const url = `getCategories`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}