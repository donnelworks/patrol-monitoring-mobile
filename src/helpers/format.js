export const timeFormat = (time) => {
    let timeArray = time?.split(":");
    let hour = timeArray[0];
    let minute = timeArray[1];
    let result = `${hour}:${minute}`;

    return result;
}