import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryTest from "./QueryTest";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryTest />
    </QueryClientProvider>
  );
}
export default App;
