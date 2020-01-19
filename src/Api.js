const HOST = 'http://localhost';

const headers = {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
}

export default function serialize(obj, prefix) {
    const str = [];

    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? `${ prefix }[${ p }]` : p;
        const v = obj[p];

        str.push((v !== null && typeof v === 'object') ? serialize(v, k) : `${ encodeURIComponent(k) }=${ encodeURIComponent(v) }`);
      }
    }
    return str.join('&');
}

const getFilterQuery = (filter = {}) => {
      if(Object.keys(filter).length === 0) return '';

      return `?${serialize({filter})}`;
}

export const authorize = (login, password) => {
    const url = `${HOST}/api/sessions`

    const payload = {
        data: {
            type: 'sessions',
            attributes: {
                login: login,
                password: password
            }
        }
    }

    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials: 'include',
    }).then((response) => {
        if (response.ok) {
            return response.status === 204 ? response : response.json();
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }).then(({data}) => data);
}

export const fetchHyps = (filter) => {
    const query = getFilterQuery(filter);
    const url = `${HOST}/api/hypervisors${query}`

    return fetch(url, {
        headers,
        credentials: 'include',
    })
        .then((response) => {
            if (response.ok) {
                return response.status === 204 ? response : response.json();
            }
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }).then(({data}) => data);
}

export const fetchMachines = (filter) => {
    const query = getFilterQuery(filter);

    const url = `${HOST}/api/virtual-machines${query}`

    return fetch(url, {
        headers,
        credentials: 'include',
    })
        .then((response) => {
            if (response.ok) {
                return response.status === 204 ? response : response.json();
            }
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }).then(({data}) => data);
}
