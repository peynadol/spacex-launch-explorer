import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { postQuery } from "../../spacexClient";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

const LaunchDetailPage = () => {
  const { id } = useParams();
  const { data: launch, isPending } = useQuery({
    queryKey: ["launch", id],
    queryFn: () =>
      fetch(`https://api.spacexdata.com/v5/launches/${id}`).then((res) =>
        res.json()
      ),
    enabled: !!id,
  });
  console.log(launch);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <LiteYouTubeEmbed
        id={launch.links.youtube_id}
        title={launch.name}
      />
    </div>
  );
};

export default LaunchDetailPage;
