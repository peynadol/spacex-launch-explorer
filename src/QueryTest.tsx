import { useQuery } from "@tanstack/react-query";

const fetchLaunches = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  const response = await fetch("https://api.spacexdata.com/v5/launches");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const QueryTest = () => {
  const { data: launches, isLoading } = useQuery({
    queryFn: fetchLaunches,
    queryKey: ["launches"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {launches.map((launch) => {
        return (
          <div key={launch.id}>
            <h2>{launch.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default QueryTest;
