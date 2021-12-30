// Called in auth and pay
export function extractHeaders(headers) {
    let c = headers['client-id'];
    let r = headers['request-time'];
    let s = headers['signature'];
    let retVal = {
        'client-id': c,
        'request-time': r,
        'signature': s,
    };

    dateToString(new Date());

    return retVal;
}

// Called in pay
export function dateToString(date) {
    let retVal = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" +
                ("0" + date.getHours()).slice(-2) + ":" + date.getMinutes() + ":" + date.getSeconds() + "+08:00" ;
  
    return retVal;
}