import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { useNavigate } from "react-router";
//TODO: on back button press, persist previous location in pagination
const LaunchDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  // fetch the launch itself
  const { data: launch, isPending } = useQuery({
    queryKey: ["launch", id],
    queryFn: () =>
      fetch(`https://api.spacexdata.com/v5/launches/${id}`).then((res) =>
        res.json()
      ),
    enabled: !!id,
  });

  // fetch the rocket (once launch is loaded)
  const { data: rocket } = useQuery({
    queryKey: ["rocket", launch?.rocket],
    queryFn: () =>
      fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`).then(
        (res) => res.json()
      ),
    enabled: !!launch?.rocket,
  });

  // fetch the launchpad (once launch is loaded)
  const { data: launchpad } = useQuery({
    queryKey: ["launchpad", launch?.launchpad],
    queryFn: () =>
      fetch(
        `https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`
      ).then((res) => res.json()),
    enabled: !!launch?.launchpad,
  });

  if (isPending) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button className="btn btn-outline mb-6" onClick={() => navigate(-1)}>
        ← Back
      </button>
      {/* patch image */}
      {launch.links.patch.large && (
        <img
          src={launch.links.patch.large}
          alt={`${launch.name} mission patch`}
          className="w-48 mb-6 mx-auto"
        />
      )}
      {/* name, date, status */}
      <h1 className="text-3xl font-bold mb-2 text-center">{launch.name}</h1>
      <p className="text-center text-gray-600 mb-2">
        {new Date(launch.date_utc).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="text-center mb-6">
        Status:{" "}
        {launch.success ? (
          <span className="text-green-600 font-semibold">Success</span>
        ) : (
          <span className="text-red-600 font-semibold">Failed</span>
        )}
      </p>
      {/* details */}
      <h2 className="text-xl font-semibold mb-2">Details</h2>
      <p className="mb-6">
        {launch.details ? launch.details : "No details available."}
      </p>
      {/* youtube embed */}
      {launch.links.youtube_id && (
        <div className="max-w-xl mx-auto mb-8">
          <LiteYouTubeEmbed id={launch.links.youtube_id} title={launch.name} />
        </div>
      )}
      {/* links */}
      <h2 className="text-xl font-semibold mb-2">Links</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        {launch.links.wikipedia && (
          <li>
            <a
              href={launch.links.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Wikipedia
            </a>
          </li>
        )}
        {launch.links.article && (
          <li>
            <a
              href={launch.links.article}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Article
            </a>
          </li>
        )}
      </ul>
      {/* rocket */}
      <h2 className="text-xl font-semibold mb-2">Rocket</h2>
      <p className="mb-6">
        {rocket ? (
          <>
            <strong>{rocket.name}</strong>
          </>
        ) : (
          "Loading rocket info..."
        )}
      </p>
      {/* launchpad */}
      <h2 className="text-xl font-semibold mb-2">Launchpad</h2>
      <p className="mb-6">
        {launchpad ? (
          <>
            <strong>{launchpad.name}</strong> — {launchpad.locality},{" "}
            {launchpad.region}
          </>
        ) : (
          "Loading launchpad info..."
        )}
      </p>
    </div>
  );
};

export default LaunchDetailPage;
