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
    <Link to={`/launches/${id}`} className="block h-full">
      <div className="bg-white  rounded-lg shadow-md p-4 flex flex-col items-center text-center h-full hover:ring-2 hover:ring-blue-400 transition">
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          {patch ? (
            <img
              src={patch}
              alt={`${name} launch patch`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <p
          className={`mt-2 text-sm font-medium ${
            success === null
              ? "text-gray-400"
              : success
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {success === null ? "Unknown" : success ? "Success" : "Failed"}
        </p>
      </div>
    </Link>
  );
};

export default LaunchCard;
