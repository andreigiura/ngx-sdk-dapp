export function isStringBase64(string) {
    try {
        return Buffer.from(string, 'base64').toString() === atob(string);
    }
    catch (err) {
        return false;
    }
}
export function encodeToBase64(string) {
    return btoa(string);
}
export function decodeBase64(string) {
    if (!isStringBase64(string)) {
        return string;
    }
    return atob(string);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9oZWxwZXJzL2Jhc2U2NFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxjQUFjLENBQUMsTUFBYztJQUMzQyxJQUFJO1FBQ0YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEU7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFjO0lBQzNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQWM7SUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUMzQixPQUFPLE1BQU0sQ0FBQztLQUNmO0lBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0Jhc2U2NChzdHJpbmc6IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShzdHJpbmcsICdiYXNlNjQnKS50b1N0cmluZygpID09PSBhdG9iKHN0cmluZyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlVG9CYXNlNjQoc3RyaW5nOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGJ0b2Eoc3RyaW5nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZUJhc2U2NChzdHJpbmc6IHN0cmluZykge1xuICBpZiAoIWlzU3RyaW5nQmFzZTY0KHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgcmV0dXJuIGF0b2Ioc3RyaW5nKTtcbn1cbiJdfQ==