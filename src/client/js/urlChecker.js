function checkForURL(inputURL) {
    const regex=/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const match=inputURL.match(regex);
    return match !=null && match.length==1;
}
export { checkForURL }
