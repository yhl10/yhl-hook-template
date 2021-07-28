export function queryString(str) {
    if (!str || str?.length === 0) return {}
    if (!str.startsWith('?')) return {}
    const o = {}
    const string = str.slice(1)
    string.split('&').forEach(item => {
        const itemAry = item.split('=')
        const [key, value] = itemAry
        o[[key]] = value
    })
    return o
}
