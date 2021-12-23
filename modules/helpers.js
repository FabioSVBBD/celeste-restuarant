export function extractHeaders(headers) {
    let c = headers['client-id'];
    let r = headers['request-time'];
    let s = headers['signature'];
    let retVal = {
        'client-id': c,
        'request-time': r,
        'signature': s,
    };

    return retVal;
}

export function dateToString(date) {
    let retVal = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" +
                ("0" + date.getHours()).slice(-2) + ":" + date.getMinutes() + ":" + date.getSeconds() + "+08:00" ;
  
    return retVal;
}