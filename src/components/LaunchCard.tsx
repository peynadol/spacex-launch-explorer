import { Link } from "react-router";

type LaunchCardProps = {
  patch: string | null;
  name: string;
  date: string;
  success: boolean | null;
  id: string;
};
const LaunchCard = ({ patch, name, date, success, id }: LaunchCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <Link to={`/launches/${id}`}>
      <div>
        {patch && <img src={patch} alt={`${name} launch patch`} />}
        <h2>{name}</h2>
        <p>{formattedDate}</p>
        <p>{success ? "Success" : "Failed"}</p>
      </div>
    </Link>
  );
};

export default LaunchCard;
