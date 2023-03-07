import "@/assets/styles/utils.css";
import "@/assets/styles/globals.scss";
import "@/assets/styles/dashboard-override.scss";
import colors from '@/assets/styles/_variables.module.scss'
import { ConfigProvider } from "antd";
import DashboardLayout from "@/layout/Dashboard.js";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

console.log("check color :", colors)

// className={`${poppins.className} m-classsss`}
export default function App({ Component, pageProps }) {
  return (
    // <StyleProvider hashPriority="high"> </StyleProvider>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "",
          colorPrimary: colors.primaryColor
        },
      }}
    >
      <DashboardLayout classProps={poppins.className}>
        <Component {...pageProps} />
      </DashboardLayout>
    </ConfigProvider>
  );
}
