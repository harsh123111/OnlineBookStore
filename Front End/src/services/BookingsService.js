import { BaseAPIGET, BaseAPIPOST } from "../components/Shared/BaseAPI"

export const getBookings = () => {
    return new Promise((resolve, reject) => {
        const url = "getStoreBookings"
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getBooks = () => {
    return new Promise((resolve, reject) => {
        const url = "getBooks"
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export const deleteBook = (bookId) => {
    return new Promise((resolve, reject) => {
        const url = `deleteBook?bookId=${bookId}`
        const method = "DELETE"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const addBook = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = `addBooks`
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateBook = (reqObj, bookId) => {
    return new Promise((resolve, reject) => {
        const url = `updateBook?bookId=${bookId}`
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export const addStoreBooking = (userId, bookId, address, amount, token, quantity, rating = 0) => {
    return new Promise((resolve, reject) => {
        const url = `addStoreBooking?userId=${userId}&address=${address}&bookId=${bookId}&rating=${rating}&date=${new Date().toDateString()}&amount=${amount}&token=${token}&quantity=${quantity}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}