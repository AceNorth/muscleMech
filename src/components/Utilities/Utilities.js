export const convertSecondsToPaceString = function(seconds) {
    let minsPerMile = Math.floor(seconds / 60).toString() === "NaN" ? "00" : Math.floor(seconds / 60).toString();

    if (minsPerMile === "Infinity") {minsPerMile = "00"};

    let secondsPerMile = Math.floor(seconds % 60).toString() === "NaN" ? "00" : Math.floor(seconds % 60).toString();
        
    if (secondsPerMile.length === 1) {
         secondsPerMile = "0" + secondsPerMile;
    }

    let paceString = minsPerMile + ":" + secondsPerMile;
    return paceString;
}


export const timeSince = function (date) {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " YEARS";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " MONTHS";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " DAYS";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " HOURS";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " MINUTES";
    }
    return Math.floor(seconds) + " SECONDS";
}