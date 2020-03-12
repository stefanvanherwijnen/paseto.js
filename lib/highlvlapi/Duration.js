module.exports = Duration;

/**
 * @param {?int} years
 * @param {?int} month
 * @param {?int} days
 * @param {?int} hours
 * @param {?int} minutes
 */
function Duration (
    years = 0,
    month = 0,
    days = 0,
    hours = 0,
    minutes = 0) {
    this.years = years;
    this.month = month;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
}

Duration.shortDuration = shortDuration;
/**
 *
 * @param {int} minutes
 * @param {?int} hours
 * @param {?int} days
 * @return {Duration}
 */
function shortDuration(minutes, hours = 0, days = 0) {
    return new Duration(0, 0, days, hours, minutes);
}


Object.defineProperty(Duration.prototype, 'getExpiration', {
    writable: false,
    enumerable: false,
    value: getExpiration,
});

/**
 *
 * @return {Readonly<Date>}
 */
function getExpiration() {
    const expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + this.years);
    expDate.setMonth(expDate.getMonth() + this.month);
    expDate.setDate(expDate.getDate() + this.days);
    expDate.setHours(expDate.getHours() + this.hours);
    expDate.setMinutes(expDate.getMinutes() + this.minutes);
    return Object.freeze(expDate);
}

Object.freeze(Duration.prototype);
