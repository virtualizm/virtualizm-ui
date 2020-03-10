import JsonApi from 'devour-client'
const jsonApi = new JsonApi({apiUrl:'https://vm.in.onat.edu.ua/api'})

jsonApi.headers['Content-Type'] = 'application/vnd.api+json';
jsonApi.headers['Accept'] = 'application/vnd.api+json';

jsonApi.axios.defaults.withCredentials = true


jsonApi.define('session', {
    login: '',
    password: ''
});

export const authorize = (login, password) => {
    return jsonApi.create('session', {
        login: login,
        password: password
    });
};

export const rebootVm = (vmId) => {
    return jsonApi.update('virtual-machine', {
        id: vmId,
        type: 'virtual-machines',
        state:'reboot'
    });
};

export const fetchSessions = () => {
    return jsonApi.find('sessions');
};

export const deleteSessions = () => {
    return jsonApi.destroy('sessions', '');
};

jsonApi.define('virtual-machine', {
    name: "",
    state: "",
    memory: 0,
    cpus: 0,
    xml: '',
    hypervisor: {
        jsonApi: 'hasOne',
        type: 'hypervisors'
    }
});

export const fetchVirtualMachines = (id) => {
    return jsonApi.findAll('virtual-machine', {
        id,
        field: { hypervisors: 'name'},
        include: 'hypervisor'
    });
}

jsonApi.define('hypervisor', {
    name: "",
    version: 0,
    libversion: 0,
    hostname: "",
    max_vcpus: 0,
    cpu_model: "",
    cpus: 0,
    mhz: 0,
    numa_nodes: 0,
    cpu_sockets: 0,
    cpu_cores: 0,
    cpu_threads: 0,
    total_memory: 0,
    free_memory: 0,
    capabilities: ''
});

export const fetchHypervisors = (id) => {
    return jsonApi.findAll('hypervisor', { id });
}


export const subscribeOnSocket = (cb) => {
    const socketInstance = new WebSocket('wss://vm.in.onat.edu.ua/ws_events');

    socketInstance.onmessage = cb;
    socketInstance.onopen = () => {
        console.log('connected');
    }
}
