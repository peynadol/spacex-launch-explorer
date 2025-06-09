// import { useQuery } from "@tanstack/react-query";
// import { postQuery } from "../spacexClient";

// const body = {
//   query: {
//     upcoming: false,
//   },
//   options: {
//     limit: 8,
//     page: 1,
//     sort: {
//       date_utc: "desc",
//     },
//   },
// };

// // const QueryTest = () => {
// //   const { data: launches, isLoading } = useQuery({
// //     queryFn: () => postQuery("launches/query", body),
// //     queryKey: ["launches"],
// //   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {launches.docs.map((launch) => {
//         return (
//           <div key={launch.id}>
//             <h2>{launch.name}</h2>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default QueryTest;
