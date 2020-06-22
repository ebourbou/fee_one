
export class HttpService {

    static HOST = 'localhost';
    static PORT = '3001';

    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        return fetch(`http://${(HttpService.HOST)}:${(HttpService.PORT)}${url}`, {
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