
const BASE_URL = "http://localhost:9091/"
export const BaseAPIPOST = (url, method, reqObj) => {
    return new Promise((resolve, reject) => {
        const res =
        fetch(`${BASE_URL}${url}`, {
        "method": method,
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
        // "body": reqObj
        "body": JSON.stringify(reqObj)
      })
      .then(response => response.json())
      .then(response => {
         resolve(response);
       })
      .catch(err => {
        reject(err);
      });
    })
}

export const BaseAPIGET = (url, method) => {
    return new Promise((resolve, reject) => {
        const res =
        fetch(`${BASE_URL}${url}`, {
        "method": method
      })
      .then(response => response.json())
      .then(response => {
         resolve(response);
       })
      .catch(err => {
        reject(err);
      });
    })
}
