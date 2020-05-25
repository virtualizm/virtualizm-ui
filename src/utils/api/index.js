import JsonApi from "devour-client";

const jsonApi = new JsonApi({ apiUrl: window.CONFIG.apiUrl });

jsonApi.headers["Content-Type"] = "application/vnd.api+json";
jsonApi.headers["Accept"] = "application/vnd.api+json";

jsonApi.axios.defaults.withCredentials = true;

jsonApi.define("session", {
  login: "",
  password: "",
});

export const authorize = (login, password) => {
  return jsonApi.create("session", {
    login: login,
    password: password,
  });
};

export const setVmState = (vmId, state) => {
  return jsonApi.update("virtual-machine", {
    id: vmId,
    type: "virtual-machines",
    state: state,
  });
};

export const fetchSessions = () => {
  return jsonApi.find("sessions");
};

export const deleteSessions = () => {
  return jsonApi.destroy("sessions", "");
};

jsonApi.define("virtual-machine", {
  name: "",
  state: "",
  is_persistent: true,
  memory: 0,
  cpus: 0,
  xml: "",
  tags: [],
  graphics: [],
  disks: [],
  hypervisor: {
    jsonApi: "hasOne",
    type: "hypervisors",
  },
  storagePools: {
    jsonApi: "hasMany",
    type: "storage-pool"
  },
  storageVolumes: {
    jsonApi: "hasMany",
    type: "storage-volume"
  }
});

export const fetchVirtualMachines = id => {
  return jsonApi.findAll("virtual-machine", {
    id,
    field: { hypervisors: "name" },
    include: "hypervisor",
  });
};

jsonApi.define("hypervisor", {
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
  capabilities: "",
  connected: false,
  virtualMachines: {
    jsonApi: "hasMany",
    type: "virtual-machine"
  },
  storagePools: {
    jsonApi: "hasMany",
    type: "storage-pool"
  }
});

export const fetchHypervisors = id => {
  return jsonApi.findAll("hypervisor", { id });
};


jsonApi.define("storage-pool", {
  name: "",
  state: "",
  pool_type: "",
  capacity: 0,
  allocation: 0,
  available: 0,
  xml: "",
  target_path: "",
  hypervisor: {
    jsonApi: "hasOne",
    type: "hypervisors",
  },
  volumes: {
    jsonApi: "hasMany",
    type: "storage-volume"
  },
  virtualMachines: {
    jsonApi: "hasMany",
    type: "virtual-machines",
  }
});

export const fetchStoragePools = id => {
  return jsonApi.findAll("storage-pool", {
    id,
    field: { hypervisors: "name" },
    include: "hypervisor",
  });
};

jsonApi.define("storage-volume", {
  name: "",
  volume_type: "",
  key: "",
  capacity: 0,
  allocation: 0,
  physical: 0,
  xml: "",
  target_path: "",
  target_format: "",
  hypervisor: {
    jsonApi: "hasOne",
    type: "hypervisors",
  },
  pool: {
    jsonApi: "hasOne",
    type: "storage-pools",
  },
  virtualMachines: {
    jsonApi: "hasMany",
      type: "virtual-machines",
  }
});

export const fetchStorageVolumes = id => {
  return jsonApi.findAll("storage-volume", {
    id,
    field: { hypervisors: "name", pools: "name", "virtual-machines": "name" },
    include: "hypervisor,pool,virtual-machines",
  });
};
