import { decodeBase64 } from './base64Utils';
import { decodeLoginToken } from './decodeLoginToken';
function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
}
export const decodeNativeAuthToken = (accessToken) => {
    if (!accessToken || !isString(accessToken)) {
        return null;
    }
    const parts = accessToken.split('.');
    if (parts.length !== 3) {
        console.error('Invalid nativeAuthToken. You may be trying to decode a loginToken. Try using decodeLoginToken method instead');
        return null;
    }
    try {
        const [address, body, signature] = parts;
        const parsedAddress = decodeBase64(address);
        const parsedBody = decodeBase64(body);
        const parsedInitToken = decodeLoginToken(parsedBody);
        if (!parsedInitToken) {
            return {
                address: parsedAddress,
                body: parsedBody,
                signature,
                blockHash: '',
                origin: '',
                ttl: 0,
            };
        }
        const result = {
            ...parsedInitToken,
            address: parsedAddress,
            body: parsedBody,
            signature,
        };
        // if empty object, delete extraInfo
        if (!parsedInitToken.extraInfo?.timestamp) {
            delete result.extraInfo;
        }
        return result;
    }
    catch (err) {
        return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlTmF0aXZlQXV0aFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNkay1kYXBwL3NyYy9saWIvaGVscGVycy9kZWNvZGVOYXRpdmVBdXRoVG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQXlCLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFN0UsU0FBUyxRQUFRLENBQUMsQ0FBTTtJQUN0QixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxpQkFBaUIsQ0FBQztBQUNqRSxDQUFDO0FBUUQsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsQ0FDbkMsV0FBb0IsRUFDZSxFQUFFO0lBQ3JDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDMUMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFckMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN0QixPQUFPLENBQUMsS0FBSyxDQUNYLDhHQUE4RyxDQUMvRyxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUk7UUFDRixNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxNQUFNLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BCLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLElBQUksRUFBRSxVQUFVO2dCQUNoQixTQUFTO2dCQUNULFNBQVMsRUFBRSxFQUFFO2dCQUNiLE1BQU0sRUFBRSxFQUFFO2dCQUNWLEdBQUcsRUFBRSxDQUFDO2FBQ1AsQ0FBQztTQUNIO1FBRUQsTUFBTSxNQUFNLEdBQUc7WUFDYixHQUFHLGVBQWU7WUFDbEIsT0FBTyxFQUFFLGFBQWE7WUFDdEIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUztTQUNWLENBQUM7UUFFRixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO1lBQ3pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUN6QjtRQUVELE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWNvZGVCYXNlNjQgfSBmcm9tICcuL2Jhc2U2NFV0aWxzJztcbmltcG9ydCB7IERlY29kZWRMb2dpblRva2VuVHlwZSwgZGVjb2RlTG9naW5Ub2tlbiB9IGZyb20gJy4vZGVjb2RlTG9naW5Ub2tlbic7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHg6IGFueSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cblxuaW50ZXJmYWNlIERlY29kZWROYXRpdmVBdXRoVG9rZW5UeXBlIGV4dGVuZHMgRGVjb2RlZExvZ2luVG9rZW5UeXBlIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBib2R5OiBzdHJpbmc7XG4gIHNpZ25hdHVyZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgZGVjb2RlTmF0aXZlQXV0aFRva2VuID0gKFxuICBhY2Nlc3NUb2tlbj86IHN0cmluZ1xuKTogRGVjb2RlZE5hdGl2ZUF1dGhUb2tlblR5cGUgfCBudWxsID0+IHtcbiAgaWYgKCFhY2Nlc3NUb2tlbiB8fCAhaXNTdHJpbmcoYWNjZXNzVG9rZW4pKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwYXJ0cyA9IGFjY2Vzc1Rva2VuLnNwbGl0KCcuJyk7XG5cbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAnSW52YWxpZCBuYXRpdmVBdXRoVG9rZW4uIFlvdSBtYXkgYmUgdHJ5aW5nIHRvIGRlY29kZSBhIGxvZ2luVG9rZW4uIFRyeSB1c2luZyBkZWNvZGVMb2dpblRva2VuIG1ldGhvZCBpbnN0ZWFkJ1xuICAgICk7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgW2FkZHJlc3MsIGJvZHksIHNpZ25hdHVyZV0gPSBwYXJ0cztcbiAgICBjb25zdCBwYXJzZWRBZGRyZXNzID0gZGVjb2RlQmFzZTY0KGFkZHJlc3MpO1xuICAgIGNvbnN0IHBhcnNlZEJvZHkgPSBkZWNvZGVCYXNlNjQoYm9keSk7XG4gICAgY29uc3QgcGFyc2VkSW5pdFRva2VuID0gZGVjb2RlTG9naW5Ub2tlbihwYXJzZWRCb2R5KTtcblxuICAgIGlmICghcGFyc2VkSW5pdFRva2VuKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiBwYXJzZWRBZGRyZXNzLFxuICAgICAgICBib2R5OiBwYXJzZWRCb2R5LFxuICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIGJsb2NrSGFzaDogJycsXG4gICAgICAgIG9yaWdpbjogJycsXG4gICAgICAgIHR0bDogMCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgLi4ucGFyc2VkSW5pdFRva2VuLFxuICAgICAgYWRkcmVzczogcGFyc2VkQWRkcmVzcyxcbiAgICAgIGJvZHk6IHBhcnNlZEJvZHksXG4gICAgICBzaWduYXR1cmUsXG4gICAgfTtcblxuICAgIC8vIGlmIGVtcHR5IG9iamVjdCwgZGVsZXRlIGV4dHJhSW5mb1xuICAgIGlmICghcGFyc2VkSW5pdFRva2VuLmV4dHJhSW5mbz8udGltZXN0YW1wKSB7XG4gICAgICBkZWxldGUgcmVzdWx0LmV4dHJhSW5mbztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbiJdfQ==