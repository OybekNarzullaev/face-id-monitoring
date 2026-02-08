import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/index.css";
import ThemeProvider from "./providers/theme";
import { ReactQueryClientProvider } from "./providers/query";
import { ReactRouterProvider } from "./providers/router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider>
        <ToastContainer />
        <ReactRouterProvider />
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
};

export default App;
