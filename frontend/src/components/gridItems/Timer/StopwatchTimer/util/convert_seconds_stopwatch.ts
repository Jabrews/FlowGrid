
type Props = {
    seconds : number
}

export default function convert_seconds_stopwatch({seconds} : Props) {

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num : number) => String(num).padStart(2, "0");

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`; 

}