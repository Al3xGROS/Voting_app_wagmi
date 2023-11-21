export function unixTimestampToReadableDateTime(unixTimestamp: bigint): string {
    const date = new Date(Number(unixTimestamp) * 1000);
    const formattedDateTime = date.toLocaleString(); // or use other methods for custom formatting
    return formattedDateTime;
  }
  
  // Utility function to convert a readable date/time string to BigInt Unix timestamp
  export function readableDateTimeToUnixTimestamp(readableDateTime: string): bigint {
    const timestamp = BigInt(new Date(readableDateTime).getTime()) / 1000n;
    return timestamp;
  }