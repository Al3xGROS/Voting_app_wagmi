export function unixTimestampToReadableDateTime(unixTimestamp: bigint): string {
    const date = new Date(Number(unixTimestamp) * 1000);
    const formattedDateTime = date.toLocaleString();
    return formattedDateTime;
}
  
export function readableDateTimeToUnixTimestamp(readableDateTime: string): bigint {
    const timestamp = BigInt(new Date(readableDateTime).getTime()) / 1000n;
    return timestamp;
}