import {Constants} from "./constants.js";

export class HttpService {

    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        return fetch(`http://${(Constants.HOST)}:${(Constants.PORT)}${url}`, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)
        }).then(x => {
            if (!x.ok) {
                throw new Error("HTTP status " + x.status);
            }
            return x.json();
        }).catch(e => console.log(e));
    }
}
