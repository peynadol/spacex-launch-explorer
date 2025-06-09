import { useQuery } from "@tanstack/react-query";
import { postQuery } from "../../spacexClient";
import LaunchCard from "./LaunchCard";
import Pagination from "./Pagination";
import { useState } from "react";

const LaunchList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const body = {
    query: {
      upcoming: false,
    },
    options: {
      limit: 8,
      page: currentPage,
      sort: {
        date_utc: "desc",
      },
    },
  };
  const { data: launches, isLoading } = useQuery({
    queryKey: ["launches", currentPage],
    queryFn: () => postQuery("launches/query", body),
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
      <Pagination
        totalPages={launches.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default LaunchList;
