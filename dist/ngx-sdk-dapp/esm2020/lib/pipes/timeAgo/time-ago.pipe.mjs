import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class TimeAgoPipe {
    transform(value, ...args) {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value * 1000)) / 1000);
            if (seconds < 29)
                // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            const intervals = {
                year: 31536000,
                month: 2592000,
                week: 604800,
                day: 86400,
                hour: 3600,
                minute: 60,
                second: 1,
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    }
                    else {
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
            }
        }
        return value;
    }
}
TimeAgoPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TimeAgoPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TimeAgoPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: TimeAgoPipe, name: "timeAgo" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TimeAgoPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'timeAgo',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZ28ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zZGstZGFwcC9zcmMvbGliL3BpcGVzL3RpbWVBZ28vdGltZS1hZ28ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsU0FBUyxDQUFDLEtBQWEsRUFBRSxHQUFHLElBQWU7UUFDekMsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUN4QixDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FDL0MsQ0FBQztZQUNGLElBQUksT0FBTyxHQUFHLEVBQUU7Z0JBQ2QsbURBQW1EO2dCQUNuRCxPQUFPLFVBQVUsQ0FBQztZQUNwQixNQUFNLFNBQVMsR0FBOEI7Z0JBQzNDLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBRSxLQUFLO2dCQUNWLElBQUksRUFBRSxJQUFJO2dCQUNWLE1BQU0sRUFBRSxFQUFFO2dCQUNWLE1BQU0sRUFBRSxDQUFDO2FBQ1YsQ0FBQztZQUNGLElBQUksT0FBTyxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ3pCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxPQUFPLEdBQUcsQ0FBQztvQkFDYixJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7d0JBQ2pCLE9BQU8sT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsdUJBQXVCO3FCQUMzRDt5QkFBTTt3QkFDTCxPQUFPLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjtxQkFDM0Q7YUFDSjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzt3R0E5QlUsV0FBVztzR0FBWCxXQUFXOzJGQUFYLFdBQVc7a0JBSHZCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFNBQVM7aUJBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd0aW1lQWdvJyxcbn0pXG5leHBvcnQgY2xhc3MgVGltZUFnb1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXIsIC4uLmFyZ3M6IHVua25vd25bXSk6IHVua25vd24ge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IoXG4gICAgICAgICgrbmV3IERhdGUoKSAtICtuZXcgRGF0ZSh2YWx1ZSAqIDEwMDApKSAvIDEwMDBcbiAgICAgICk7XG4gICAgICBpZiAoc2Vjb25kcyA8IDI5KVxuICAgICAgICAvLyBsZXNzIHRoYW4gMzAgc2Vjb25kcyBhZ28gd2lsbCBzaG93IGFzICdKdXN0IG5vdydcbiAgICAgICAgcmV0dXJuICdKdXN0IG5vdyc7XG4gICAgICBjb25zdCBpbnRlcnZhbHM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7XG4gICAgICAgIHllYXI6IDMxNTM2MDAwLFxuICAgICAgICBtb250aDogMjU5MjAwMCxcbiAgICAgICAgd2VlazogNjA0ODAwLFxuICAgICAgICBkYXk6IDg2NDAwLFxuICAgICAgICBob3VyOiAzNjAwLFxuICAgICAgICBtaW51dGU6IDYwLFxuICAgICAgICBzZWNvbmQ6IDEsXG4gICAgICB9O1xuICAgICAgbGV0IGNvdW50ZXI7XG4gICAgICBmb3IgKGNvbnN0IGkgaW4gaW50ZXJ2YWxzKSB7XG4gICAgICAgIGNvdW50ZXIgPSBNYXRoLmZsb29yKHNlY29uZHMgLyBpbnRlcnZhbHNbaV0pO1xuICAgICAgICBpZiAoY291bnRlciA+IDApXG4gICAgICAgICAgaWYgKGNvdW50ZXIgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3VudGVyICsgJyAnICsgaSArICcgYWdvJzsgLy8gc2luZ3VsYXIgKDEgZGF5IGFnbylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGNvdW50ZXIgKyAnICcgKyBpICsgJ3MgYWdvJzsgLy8gcGx1cmFsICgyIGRheXMgYWdvKVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=