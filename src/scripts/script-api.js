class Api {
    constructor(serverUrl, token) {
        this.serverUrl = serverUrl;
        this.token = token;
    }
    request(address, options) {
        return new Promise(function (resolve, reject) {
            fetch(address, options)
                .then(res => {
                    if (!res.ok) {
                        reject(res)
                    }
                    return res.json()
                })
                .then((result) => {
                    resolve(result)
                })
                .catch(error => reject(error))
        })
    }
    getCards() {
        return this.request(this.serverUrl + '/cohort10/cards', {
            headers: {
                authorization: this.token
            }
        })

    }

    getUser() {
        return this.request(this.serverUrl + '/cohort10/users/me', {
            headers: {
                authorization: this.token
            }
        })
    }

    updateUser(body) {
        return this.request(this.serverUrl + '/cohort10/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: body
        })
    }
}