import "@/assets/styles/utils.css";
import "@/assets/styles/globals.scss";
import "@/assets/styles/dashboard-override.scss";
// import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import DashboardLayout from "@/layout/Dashboard.js";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

// className={`${poppins.className} m-classsss`}
export default function App({ Component, pageProps }) {
  return (
    // <StyleProvider hashPriority="high"> </StyleProvider>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "",
        },
      }}
    >
      <DashboardLayout classProps={poppins.className}>
        <Component {...pageProps} />
      </DashboardLayout>
    </ConfigProvider>
  );
}
