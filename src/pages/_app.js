import "@/assets/styles/globals.css";
import "@/assets/styles/dashboard-override.scss";
import { StyleProvider } from "@ant-design/cssinjs";
import DashboardLayout from "@/layout/Dashboard.js";

export default function App({ Component, pageProps }) {
  return (
    // <StyleProvider hashPriority="high"> </StyleProvider>
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  );
}
