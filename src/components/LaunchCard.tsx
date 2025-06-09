type LaunchCardProps = {
  patch: string | null;
  name: string;
  date: string;
  success: boolean | null;
};
const LaunchCard = ({ patch, name, date, success }: LaunchCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <div>
      {patch && <img src={patch} alt={`${name} launch patch`} />}
      <h2>{name}</h2>
      <p>{formattedDate}</p>
      <p>{success ? "Success" : "Failed"}</p>
    </div>
  );
};

export default LaunchCard;
