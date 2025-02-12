import moment from "moment";

export function formatCreatedAt(createdAt) {
    const now = moment();
    const createdAtMoment = moment(createdAt);
  
    // If created within the last minute
    if (now.diff(createdAtMoment, 'minutes') < 1) {
      return 'Just now';
    }
  
    // If created within the last hour
    if (now.diff(createdAtMoment, 'hours') < 1) {
      return `${now.diff(createdAtMoment, 'minutes')} min ago`;
    }
  
    // Otherwise, return actual time in 'hh:mm A' format
    // Format it as 'MM/DD/YYYY' for the date
    return `${createdAtMoment.format('hh:mm A')} | ${createdAtMoment.format('MM/DD/YYYY')}`;
  }
  
// Example MongoDB createdAt value
const createdAt = new Date('2025-02-06T08:41:41.008Z');  // Example timestamp

console.log(formatCreatedAt(createdAt));  // Output: 10:55 AM or similar based on current time
