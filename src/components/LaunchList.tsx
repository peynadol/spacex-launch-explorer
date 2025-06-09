import { useQuery } from "@tanstack/react-query";
import { postQuery } from "../../spacexClient";
import LaunchCard from "./LaunchCard";

const body = {
  query: {
    upcoming: false,
  },
  options: {
    limit: 8,
    page: 1,
    sort: {
      date_utc: "desc",
    },
  },
};
const LaunchList = () => {
  const { data: launches, isLoading } = useQuery({
    queryFn: () => postQuery("launches/query", body),
    queryKey: ["launches"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {launches.docs.map((launch) => (
        <LaunchCard
          patch={launch.links.patch.small}
          name={launch.name}
          date={launch.date_utc}
          success={launch.success}
        />
      ))}
    </div>
  );
};

export default LaunchList;
