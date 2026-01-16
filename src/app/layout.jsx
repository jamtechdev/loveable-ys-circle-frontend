// DO NOT use any client hook here!
import { ReduxProvider } from "../redux/provider";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../lib/theme";
import ClientApp from "./ClientApp";
import "./globals.css";
// app/layout.js (App Router)
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ClientApp>{children}</ClientApp>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
