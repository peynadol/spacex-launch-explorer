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
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {launches.docs.map((launch) => (
          <LaunchCard
            key={launch.id}
            patch={launch.links.patch.small}
            name={launch.name}
            date={launch.date_utc}
            success={launch.success}
            id={launch.id}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          totalPages={launches.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default LaunchList;
