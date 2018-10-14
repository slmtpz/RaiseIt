import axios from 'axios';

class RequestHandler {
    constructor() {
        this.baseIP = 'http://192.168.1.124:5000';
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
    }

    post(path, data) {
        let postConfig = { headers: {'Content-Type': 'multipart/form-data' }};
        let form = new FormData()
        for (let key in data) {
            form.append(key, data[key]);
        }

        return axios({
            method: 'post',
            url: this.baseIP + path,
            data: form,
            config: postConfig
        })
    }

    get(path, username) {
        let getConfig = { headers: {'Content-Type': 'multipart/form-data' }};
        if (username)
            getConfig.headers['username'] = username

        // console.log('req hand, get called. this:', this); return;
        return axios({
            method: 'get',
            url: this.baseIP + path,
            config: getConfig
        })
    }
}

export default new RequestHandler();