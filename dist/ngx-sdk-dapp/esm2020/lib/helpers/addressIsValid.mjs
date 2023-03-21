import { Address } from '@multiversx/sdk-core';
function canTransformToPublicKey(address) {
    try {
        const checkAddress = new Address(address);
        return Boolean(checkAddress.bech32());
    }
    catch {
        return false;
    }
}
export function addressIsValid(destinationAddress) {
    const isValidBach = destinationAddress?.startsWith('erd') &&
        destinationAddress.length === 62 &&
        /^\w+$/.test(destinationAddress);
    return isValidBach && canTransformToPublicKey(destinationAddress);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc0lzVmFsaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc2RrLWRhcHAvc3JjL2xpYi9oZWxwZXJzL2FkZHJlc3NJc1ZhbGlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUvQyxTQUFTLHVCQUF1QixDQUFDLE9BQWU7SUFDOUMsSUFBSTtRQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDO0lBQUMsTUFBTTtRQUNOLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxrQkFBMEI7SUFDdkQsTUFBTSxXQUFXLEdBQ2Ysa0JBQWtCLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNyQyxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssRUFBRTtRQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFbkMsT0FBTyxXQUFXLElBQUksdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNwRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJ0BtdWx0aXZlcnN4L3Nkay1jb3JlJztcblxuZnVuY3Rpb24gY2FuVHJhbnNmb3JtVG9QdWJsaWNLZXkoYWRkcmVzczogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgY2hlY2tBZGRyZXNzID0gbmV3IEFkZHJlc3MoYWRkcmVzcyk7XG4gICAgcmV0dXJuIEJvb2xlYW4oY2hlY2tBZGRyZXNzLmJlY2gzMigpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRyZXNzSXNWYWxpZChkZXN0aW5hdGlvbkFkZHJlc3M6IHN0cmluZykge1xuICBjb25zdCBpc1ZhbGlkQmFjaCA9XG4gICAgZGVzdGluYXRpb25BZGRyZXNzPy5zdGFydHNXaXRoKCdlcmQnKSAmJlxuICAgIGRlc3RpbmF0aW9uQWRkcmVzcy5sZW5ndGggPT09IDYyICYmXG4gICAgL15cXHcrJC8udGVzdChkZXN0aW5hdGlvbkFkZHJlc3MpO1xuXG4gIHJldHVybiBpc1ZhbGlkQmFjaCAmJiBjYW5UcmFuc2Zvcm1Ub1B1YmxpY0tleShkZXN0aW5hdGlvbkFkZHJlc3MpO1xufVxuIl19