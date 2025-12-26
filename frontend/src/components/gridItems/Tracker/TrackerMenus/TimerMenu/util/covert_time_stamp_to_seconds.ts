
type props = {
    timeStamp: string
}


export default function convert_time_stamp_to_seconds({timeStamp} : props) {

  // format: HH:MM:SS
  const parts = timeStamp.split(":");

  if (parts.length !== 3) {
    throw new Error("Invalid time format. Expected HH:MM:SS");
  }

  const [hStr, mStr, sStr] = parts;

  const hours = Number(hStr);
  const minutes = Number(mStr);
  const seconds = Number(sStr);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    Number.isNaN(seconds)
  ) {
    throw new Error("Time contains non-numeric values");
  }

  if (hours < 0 || hours >= 100) {
    throw new Error("Hours must be between 0 and 99");
  }

  if (minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
    throw new Error("Minutes and seconds must be between 0 and 59");
  }

  return hours * 3600 + minutes * 60 + seconds;



}