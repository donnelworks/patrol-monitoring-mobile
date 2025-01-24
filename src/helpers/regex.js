export const isBase64 = (str) => {
    str = str.trim();
    if (typeof str !== 'string' || str.length % 4 !== 0) {
        return false;
    }
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(str);
}