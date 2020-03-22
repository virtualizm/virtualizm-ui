const defaultApiHost = 'https://vm.in.onat.edu.ua'
const defaultWsHost = 'wss://vm.in.onat.edu.ua'
const apiHost = process.env.API_HOST || defaultApiHost
const wsHost = process.env.WS_HOST || defaultWsHost
const apiUrl = `${apiHost}/api`
const wsUrl = `${wsHost}/ws_events`

export { apiHost, wsHost, apiUrl, wsUrl }
