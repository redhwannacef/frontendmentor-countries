import React from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Header";
import Countries from "./pages/countries";
import { QueryClient, QueryClientProvider } from "react-query";
import Country from "./pages/country";
import useDarkMode, { DarkModeProvider } from "./DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
});

const App = () => (
  <DarkModeProvider>
    <Content />
  </DarkModeProvider>
);

const Content = () => {
  // @ts-ignore
  const [prefersDarkMode] = useDarkMode();

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
          },
          typography: {
            fontFamily: "Nunito Sans",
            fontWeightMedium: 600,
          },
          components: {
            MuiContainer: {
              defaultProps: {
                maxWidth: "xl",
              },
            },
          },
        })
      ),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <React.Suspense fallback="Loading...">
            <Header />
            <Container>
              <Routes>
                <Route path="/countries" element={<Countries />} />
                <Route path="/countries/:countryName" element={<Country />} />
                <Route path="*" element={<Navigate to="/countries" />} />
              </Routes>
            </Container>
          </React.Suspense>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
