import styles from "./dashboard.module.scss";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import variables from "@/assets/styles/_variables.module.scss";
import { theme, Dropdown, Button, Avatar } from "antd";
import Headline from "@/components/Headline.js";
import More from "../../public/images/more.svg";
import Calendar from "../../public/images/calendar.svg";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { DownOutlined } from "@ant-design/icons";

// data for the sparklines that appear below header area
const sparklineData = [24, 35, 37, 50, 31, 36, 20, 33];

const chartOption = {
  chart: {
    id: "sparkline",
    // group: "sparklines",
    type: "area",
    width: "70%",
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    // opacity: 1,
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0,
      opacityFrom: 0.4,
      opacityTo: 0,
    },
    // type: "solid",
    // colors: ["transparent"],
  },
  labels: [...Array(8).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    min: 0,
    max: 70,
  },
  colors: ["#008FFB"],
};
const chartOption2 = {
  chart: {
    id: "sparkline2",
    // group: "sparklines",
    type: "area",
    width: "70%",
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0,
      opacityFrom: 0.4,
      opacityTo: 0,
    },
  },
  labels: [...Array(8).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    min: 0,
    max: 70,
  },
  colors: ["#22AB67"],
};
const chartOption3 = {
  chart: {
    id: "sparkline3",
    // group: "sparklines",
    type: "area",
    width: "70%",
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0,
      opacityFrom: 0.4,
      opacityTo: 0,
    },
  },
  labels: [...Array(8).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    min: 0,
    max: 70,
  },
  colors: ["#F8BD26"],
};

const columnChartOption = {
  chart: {
    id: "col-chart-stat",
    type: "bar",
    width: "100%",
    toolbar: {
      show: false,
    },
  },
  colors: ["#0A6EE1", "#22AB67"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "65%",
      endingShape: "rounded",
      borderRadiusApplication: "end",
      borderRadius: 12,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yaxis: {
    // title: {
    //   text: "$ (thousands)",
    // },
    min: 0,
    max: 10000,
    tickAmount: 4,
    // logarithmic: true,
    // logBase: 10,
    // forceNiceScale: true,
    labels: {
      formatter: function labelFormatter(value) {
        let val = Math.abs(value);
        if (val >= 1000) {
          val = (val / 1000).toFixed() + " K";
        }

        // console.log("check val", val);
        return val;
      },
    },
  },
  legend: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
        // console.log("debug val :", val);
        // console.log("debug series :", series);
        // console.log("debug seriesIndex :", seriesIndex);
        // console.log("debug dataPointIndex :", dataPointIndex);
        // console.log("debug w :", w);
        return "$ " + val + " thousands";
      },
    },
  },
};

const balanceChartOption = {
  chart: {
    id: "balance",
    type: "line",
    width: "100%",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    lineCap: "round",
  },
  colors: ["#ffffff", "#ffffff30"],
  grid: {
    show: true,
    borderColor: "#FFFFFF30",
    strokeDashArray: 6,
    /* row: {
      color: "#FFFFFF",
      opacity: 0.2,
    },
    column: {
      color: "#FFFFFF",
      opacity: 0.2,
    }, */
  },

  legend: {
    show: false,
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    // tickAmount: 20,
    // tickPlacement: "between",
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
      height: 2,
    },
    axisTicks: {
      // show: true,
      show: true,
      borderType: "dashed",
      color: "#FFF",
      height: 4,
      offsetX: 1,
      offsetY: -3,
    },
  },
  tooltip: {
    style: {
      fontSize: "20px",
      fontFamily: "Poppins",
      color: "#000",
    },
    marker: true,
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return (
        '<div class="arrow_box ">' +
        "<span>" +
        series[seriesIndex][dataPointIndex] +
        "</span>" +
        "</div>"
      );
    },
  },
};

export default function Home() {
  const [loadings, setLoadings] = useState([]);

  const items = [
    {
      label: "Select Date Range",
      key: "1",
    },
  ];
  const items2 = [
    {
      label: "Select Cards",
      key: "2",
      onClick: () => enterLoading(1),
    },
  ];

  const enterLoading = (index) => {
    setLoadings((state) => {
      const newLoadings = [...state];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const [barData, setBarData] = useState([
    {
      name: "Profits",
      // data: randomizeArray(sparklineData),
      data: sparklineData,
    },
  ]);

  const [colData, setColData] = useState([
    {
      name: "Income",
      data: [1900, 2600, 5300, 4900, 9000, 5600, 3900],
    },
    {
      name: "Expand",
      data: [7400, 500, 2400, 1000, 1600, 4200, 1800],
    },
  ]);
  const [balanceData, setBalanceData] = useState([
    {
      name: "Income",
      // data: [0, 75, 30, 100, 120, 250, 110, 230],
      data: [0, 39, 52, 11, 29, 43],
    },
    {
      name: "Expand",
      // data: [0, 50, 15, 110, 150, 70, 150, 70, 230],
      data: [3, 33, 21, 42, 19, 12, 43],
    },
  ]);

  useEffect(() => {}, []);

  function btnCustom(buttons) {
    const NewBpBtn = (
      <div className="new-tst">
        <div>test</div>
      </div>
    );
    const NewBtn = [NewBpBtn, ...buttons];

    return NewBtn;
  }

  return (
    <>
      <Head>
        <title>Axons Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`dashboard ${styles.chart}`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-x-2 gap-y-8">
            <div className="col-span-12">
              <Headline title="Overview">
                <div className="flex space-x-4 justify-end">
                  <Button
                    className={`${styles.iconBox} ${styles.button} btn-round custom-btn borderless`}
                  >
                    <span className={`${styles.bgWhite}`}></span>
                    <span className={`${styles.export}`}></span>
                  </Button>
                  <Dropdown loading={loadings[1]} menu={{ items: items2 }}>
                    <Button className="custom-btn borderless">
                      <span className="flex gap-2 items-center space-x-1 custom">
                        <span className="ax-text-black">Last 7 days</span>
                        <Image
                          priority
                          src="/images/arrow-ddl-down.svg"
                          height={10}
                          width={10}
                          alt="dropdown trigger"
                        />
                      </span>
                    </Button>
                  </Dropdown>
                </div>
              </Headline>
            </div>
            <div className="col-span-12">
              <div className={`p-3 ${styles.bRound} bg-white`}>
                <div className={`grid grid-cols-12 gap-2 ${styles.chartLine}`}>
                  <div className="col-span-4 bg-white">
                    <div className="grid grid-cols-12 gap-1 px-2 items-center">
                      <div className="col-span-8 text-base xl:col-span-7">
                        <div className="body-ligth">Total Income</div>
                        <div className="pt-1">
                          <span className="text-2rem ax-text-black">
                            $8.500
                          </span>
                          <span className="inline-flex items-center pl-2">
                            {" "}
                            <Image
                              priority
                              src="/images/arrow-up.svg"
                              height={15}
                              width={15}
                              alt="Follow us on Twitter"
                            />{" "}
                            <span>50.8%</span>
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 xl:col-span-5">
                        <Chart
                          options={chartOption}
                          series={barData}
                          type="area"
                          // width="500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 bg-white">
                    <div className="grid grid-cols-12 gap-1 px-2 items-center">
                      <div className="col-span-8 text-base xl:col-span-7">
                        <div className="body-ligth">Total Expense</div>
                        <div className="pt-1">
                          <span className="text-2rem ax-text-black">
                            3.500K
                          </span>
                          <span className="inline-flex items-center pl-2">
                            {" "}
                            <Image
                              priority
                              src="/images/arrow-down.svg"
                              height={15}
                              width={15}
                              alt="Follow us on Twitter"
                            />{" "}
                            <span>10.5%</span>
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 xl:col-span-5">
                        <Chart
                          options={chartOption2}
                          series={barData}
                          type="area"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 bg-white">
                    <div className="grid grid-cols-12 gap-1 px-2 items-center">
                      <div className="col-span-8 text-base xl:col-span-7">
                        <div className="body-ligth">Total Bonus</div>
                        <div className="pt-1">
                          <span className="text-2rem ax-text-black">
                            5.100K
                          </span>
                          <span className="inline-flex items-center pl-2">
                            {" "}
                            <Image
                              priority
                              src="/images/arrow-up.svg"
                              height={15}
                              width={15}
                              alt="Follow us on Twitter"
                            />{" "}
                            <span>24.9%</span>
                          </span>
                        </div>
                      </div>
                      <div className="col-span-4 xl:col-span-5">
                        <Chart
                          options={chartOption3}
                          series={barData}
                          type="area"
                          // width="500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-x-8">
                <div className="col-span-7">
                  <div className={`bar-chart p-6 bg-white ${styles.bRound}`}>
                    <div className="grid grid-cols-12 gap-2 pb-4 items-center">
                      <div className="col-span-8 text-2xl">Statistics</div>
                      <div className="col-span-4 justify-self-end">
                        <Dropdown loading={loadings[1]} menu={{ items }}>
                          <div className="flex gap-2 items-center">
                            <Button
                              className="custom-btn flex gap-2 items-center "
                              icon={<Calendar className="ax-text-black" />}
                            >
                              <span className="ax-text-black">
                                19 Aug - 25 Aug
                              </span>
                              <Image
                                priority
                                src="/images/arrow-ddl-down.svg"
                                height={10}
                                width={10}
                                alt="dropdown trigger"
                              />
                            </Button>
                          </div>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <div className={`col-span-3 flex gap-x-2`}>
                        <div className={`${styles.iconBox}`}>
                          <div className={`${styles.bg}`}></div>
                          <div className={`${styles.arrUp}`}></div>
                        </div>
                        <div className="detail">
                          <div className={`${styles.title}`}>20.500</div>
                          <div className={`${styles.type}`}>Income</div>
                        </div>
                      </div>
                      <div className="col-span-3 flex gap-x-2">
                        <div className={`${styles.iconBox}`}>
                          <div className={`${styles.bg}`}></div>
                          <div className={`${styles.arrDown}`}></div>
                        </div>
                        <div className="detail">
                          <div className={`${styles.title}`}>5.400</div>
                          <div className={`${styles.type}`}>Outcome</div>
                        </div>
                      </div>
                    </div>
                    <Chart
                      options={columnChartOption}
                      series={colData}
                      type="bar"
                    />
                  </div>
                </div>
                <div className="col-span-5">
                  <div className={`${styles.bRound} ${styles.balanceCard} p-6`}>
                    <Headline className="text-white" title="Balance">
                      <Button
                        className={`${styles.iconBox} custom-btn`}
                        type="text"
                        icon={<More className="text-white" />}
                      >
                        {/* <Image
                          className="align-middle"
                          priority
                          src="/images/more.svg"
                          height={20}
                          width={20}
                          alt="more info"
                        /> */}
                      </Button>
                    </Headline>
                    <div className=" grid grid-cols-12">
                      <div className="col-span-12">
                        <div className="grid grid-cols-12 pt-4 ">
                          <div className="col-span-12 space-y-2">
                            <div className="text-4xl text-white">
                              $27,500.00
                            </div>
                            <div className="space-x-2 text-white">
                              <Button
                                type="text"
                                className={`body-ligth ${styles.balanceBtnBg}`}
                              >
                                {/* <span
                                  className={`w-full h-full absolute ${styles.btnBg}`}
                                ></span> */}
                                <span className="">Income</span>
                              </Button>
                              <Button
                                type="text"
                                className={`body-ligth ${styles.balanceBtnBg}`}
                              >
                                Expenses
                              </Button>
                            </div>
                            <Chart
                              options={balanceChartOption}
                              series={balanceData}
                              type="line"
                            />
                          </div>
                          <div className="col-span-4">
                            <div className="px-4 text-white">
                              <span className="opacity-80">Income:</span> $500
                            </div>
                          </div>
                          <div className="col-span-4">
                            <div className="px-4 text-white">
                              <span className="opacity-80">Spending:</span> $200
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-x-8">
                <div className="col-span-7">
                  <div className={`my-cards p-6 bg-white ${styles.bRound}`}>
                    <Headline title="My Card">
                      <Dropdown loading={loadings[1]} menu={{ items: items2 }}>
                        <Button className="custom-btn">
                          <span className="flex gap-2 items-center space-x-1 custom">
                            <Image
                              priority
                              src="/images/card-logo.svg"
                              height={15}
                              width={15}
                              alt="date picker"
                            />
                            <span className="ax-text-black">
                              5880 **** **** 8854
                            </span>
                            <Image
                              priority
                              src="/images/arrow-ddl-down.svg"
                              height={10}
                              width={10}
                              alt="dropdown trigger"
                            />
                          </span>
                        </Button>
                      </Dropdown>
                    </Headline>
                    <div className="grid grid-cols-12 gap-2 pb-4 md:gap-x-4 lg:gap-x-8">
                      <div className="col-span-6">
                        <div className={styles.myCardBase}>
                          <div className="absolute top-6 left-6">
                            <div className="text-sm opacity-80">
                              Current Balance
                            </div>
                            <div className="text-2xl">80,700.00</div>
                          </div>
                          <div className="absolute bottom-6 left-6 z-20">
                            <div className="text-lg">Felecia Brown</div>
                            <div className="text-sm opacity-80">
                              •••• •••• •••• 8854
                            </div>
                          </div>
                          <div className="absolute top-6 right-6">
                            <Image
                              priority
                              src="/images/visa-logo.svg"
                              height={16}
                              width={45}
                              alt="visa"
                            />
                          </div>
                          <div className="absolute bottom-6 right-6 z-10 text-sm">
                            12/19
                          </div>
                          <div className={styles.circleAw}></div>
                        </div>
                      </div>
                      <div className="col-span-6">
                        <div className="card-detail space-y-3">
                          <div className="grid grid-cols-12">
                            <div className="col-span-6 body-ligth">
                              Card Type:
                            </div>
                            <div className="col-span-6">Visa</div>
                          </div>
                          <div className="grid grid-cols-12">
                            <div className="col-span-6 body-ligth">
                              Card Holder:
                            </div>
                            <div className="col-span-6">Felecia Brown</div>
                          </div>
                          <div className="grid grid-cols-12">
                            <div className="col-span-6 body-ligth ">
                              Expires:
                            </div>
                            <div className="col-span-6">12/19</div>
                          </div>
                          <div className="grid grid-cols-12">
                            <div className="col-span-6 body-ligth ">
                              Card Number:
                            </div>
                            <div className="col-span-6">
                              5880 5087 3288 8854
                            </div>
                          </div>
                          <div className="grid grid-cols-12">
                            <div className="col-span-6 body-ligth ">
                              Total Balance:
                            </div>
                            <div className="col-span-6">80,700.00</div>
                          </div>
                          <div className="grid grid-cols-12">
                            <div className="col-span-6 body-ligth ">
                              Total Debt:
                            </div>
                            <div className="col-span-6">8,250.00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 gap-x-12">
                      <div className="col-span-6">
                        <div className="py-8">
                          <div
                            className={`h-separator ${styles.lineMaxwidth} mx-auto`}
                          ></div>
                        </div>
                        <Button className="w-full custom-btn relative borderless primary">
                          <span
                            className={`w-full h-full absolute ${styles.btnBg} btn-round`}
                          ></span>
                          <span className="custom items-center gap-2 justify-center">
                            <span className={styles.addIcon} />
                            <span>Add</span>
                          </span>
                        </Button>
                      </div>
                      <div className="col-span-6">
                        <div className="py-8">
                          <div
                            className={`h-separator ${styles.lineMaxwidth} mx-auto`}
                          ></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-5">
                            <Button className="w-full custom-btn relative borderless primary-bg ">
                              <span className="text-white">Pay Debt</span>
                            </Button>
                          </div>
                          <div className="col-span-5">
                            <Button className="w-full custom-btn relative ">
                              <span className="body-dark">Cancel</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-5">
                  <div className={`${styles.transactions} p-6 min-h-full`}>
                    <Headline title="Transection">
                      <Button type="text" className="custom-btn body-ligth ">
                        <Image
                          className="align-middle"
                          priority
                          src="/images/more.svg"
                          height={20}
                          width={20}
                          alt="more info"
                        />
                      </Button>
                    </Headline>
                    <section className="transection-list space-y-6">
                      <section className="grid grid-cols-12 items-center">
                        <div className="col-span-9">
                          <div className="flex items-center gap-x-4">
                            <Avatar
                              className={`${styles.icon} ${styles.shopping}`}
                              src="/images/shopping.svg"
                              alt="shopping"
                            />
                            <div className="detail">
                              <div>Shopping</div>
                              <div className="body-ligth">
                                08:00 AM — 19 August
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">-$1.400</div>
                      </section>
                      <section className="grid grid-cols-12 items-center">
                        <div className="col-span-9">
                          <div className="flex items-center gap-x-4">
                            <Avatar
                              className={`${styles.icon} ${styles.travel}`}
                              src="/images/travel.svg"
                              alt="shopping"
                            />
                            <div className="detail">
                              <div>Travel</div>
                              <div className="body-ligth">
                                09:45 AM — 21 August
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">-$850</div>
                      </section>
                      <section className="grid grid-cols-12 items-center">
                        {/* <div className="col-span-2 justify-self-center">
                          <Avatar
                            className={`${styles.icon} ${styles.food}`}
                            src="/images/shopping.svg"
                            alt="shopping"
                          />
                        </div> */}
                        <div className="col-span-9">
                          <div className="flex items-center gap-x-4">
                            <Avatar
                              className={`${styles.icon} ${styles.food}`}
                              src="/images/shopping.svg"
                              alt="shopping"
                            />
                            <div className="detail">
                              <div>Food</div>
                              <div className="body-ligth">
                                10:15 AM — 24 August
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">-$2.150</div>
                      </section>
                      <section className="grid grid-cols-12 items-center">
                        <div className="col-span-9">
                          <div className="flex items-center gap-x-4">
                            <Avatar
                              className={`${styles.icon} ${styles.medicine}`}
                              src="/images/like.svg"
                              alt="medicine"
                            />
                            <div className="detail">
                              <div>Medicine</div>
                              <div className="body-ligth">
                                10:50 AM — 24 August
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">-$650</div>
                      </section>
                      <section className="grid grid-cols-12 items-center">
                        <div className="col-span-9">
                          <div className="flex items-center gap-x-4">
                            <Avatar
                              className={`${styles.icon} ${styles.sport}`}
                              src="/images/sport.svg"
                              alt="sport"
                            />
                            <div className="detail">
                              <div>Sport</div>
                              <div className="body-ligth">
                                12:45 AM — 28 August
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">-$900</div>
                      </section>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        .bg-1 {
          background-color: yellow;
        }
      `}</style> */}
    </>
  );
}
