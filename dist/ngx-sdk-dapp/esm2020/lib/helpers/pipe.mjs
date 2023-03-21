export function pipe(previous) {
    return {
        if: function (condition) {
            if (condition) {
                return {
                    then: (newValue) => 
                    // if a callback is passed, callback is executed with previous value
                    newValue instanceof Function
                        ? pipe(newValue(previous))
                        : pipe(newValue)
                };
            }
            else {
                return {
                    then: () => pipe(previous)
                };
            }
        },
        then: (newValue) => newValue instanceof Function ? pipe(newValue(previous)) : pipe(newValue),
        valueOf: function () {
            return previous;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL2hlbHBlcnMvcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsSUFBSSxDQUFZLFFBQW1CO0lBQ2pELE9BQU87UUFDTCxFQUFFLEVBQUUsVUFBVSxTQUFrQjtZQUM5QixJQUFJLFNBQVMsRUFBRTtnQkFDYixPQUFPO29CQUNMLElBQUksRUFBRSxDQUFDLFFBQXNELEVBQUUsRUFBRTtvQkFDL0Qsb0VBQW9FO29CQUNwRSxRQUFRLFlBQVksUUFBUTt3QkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUNyQixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsT0FBTztvQkFDTCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDM0IsQ0FBQzthQUNIO1FBQ0gsQ0FBQztRQUVELElBQUksRUFBRSxDQUFDLFFBQXNELEVBQUUsRUFBRSxDQUMvRCxRQUFRLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFMUUsT0FBTyxFQUFFO1lBQ1AsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHBpcGU8VmFsdWVUeXBlPihwcmV2aW91czogVmFsdWVUeXBlKSB7XG4gIHJldHVybiB7XG4gICAgaWY6IGZ1bmN0aW9uIChjb25kaXRpb246IGJvb2xlYW4pIHtcbiAgICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0aGVuOiAobmV3VmFsdWU6IFZhbHVlVHlwZSB8ICgocHJvcDogVmFsdWVUeXBlKSA9PiBWYWx1ZVR5cGUpKSA9PlxuICAgICAgICAgICAgLy8gaWYgYSBjYWxsYmFjayBpcyBwYXNzZWQsIGNhbGxiYWNrIGlzIGV4ZWN1dGVkIHdpdGggcHJldmlvdXMgdmFsdWVcbiAgICAgICAgICAgIG5ld1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb25cbiAgICAgICAgICAgICAgPyBwaXBlKG5ld1ZhbHVlKHByZXZpb3VzKSlcbiAgICAgICAgICAgICAgOiBwaXBlKG5ld1ZhbHVlKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0aGVuOiAoKSA9PiBwaXBlKHByZXZpb3VzKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0aGVuOiAobmV3VmFsdWU6IFZhbHVlVHlwZSB8ICgocHJvcDogVmFsdWVUeXBlKSA9PiBWYWx1ZVR5cGUpKSA9PlxuICAgICAgbmV3VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHBpcGUobmV3VmFsdWUocHJldmlvdXMpKSA6IHBpcGUobmV3VmFsdWUpLFxuXG4gICAgdmFsdWVPZjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==