import styles from "./product.module.scss";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import Headline from "@/components/Headline";
import Separator from "@/components/Separator";
import Unread from "@/components/Unread";

import {
  Tabs,
  Table,
  Space,
  Menu,
  Avatar,
  Select,
  Button,
  Dropdown,
} from "antd";
import Plus from "../../../public/images/plus.svg";
import Export from "../../../public/images/export.svg";
import Grid from "@/assets/images/grid.svg";
import Hamburger from "@/assets/images/hamburger.svg";

const ProductTable = dynamic(() => import("@/components/Table"), {
  ssr: false,
  loading: () => "Loading...",
});

export default function Product() {
  const [loadings, setLoadings] = useState([]);
  const itemsDropdown = [
    {
      label: "Select Export",
      key: "2",
      onClick: () => enterLoading(1),
    },
  ];

  function enterLoading(index) {
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
  }

  return (
    <>
      <Head>
        <title>Product Page</title>
      </Head>
      <div className={` ${styles.productPage}`}>
        <div className="container mx-auto">
          <Headline title="Products">
            <div className="flex space-x-4 justify-end">
              <Dropdown menu={{ items: itemsDropdown }}>
                <Button className="custom-btn borderless items-center">
                  <span className="flex gap-2 items-center space-x-1 custom">
                    <Export />
                    <span className="ax-text-black">Export</span>
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
              <Button
                className={`${styles.iconBox} ${styles.button} btn-round custom-btn borderless relative `}
                icon={<Plus className="z-10 text-white" />}
              >
                <span
                  className={`${styles.bgPrimary} primary-bg absolute w-full h-full btn-round`}
                ></span>
                <span className={`${styles.add}`}></span>
              </Button>
            </div>
          </Headline>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: (
                      <span className="flex w-full gap-2 justify-between items-center">
                        <span>All</span>
                        <Unread unreadMsg={283} />
                      </span>
                    ),
                    key: "1",
                    children: <ProductTable />,
                  },
                  {
                    label: (
                      <span className="flex w-full gap-2 justify-between items-center">
                        <span>Available</span>
                        <Unread disabled unreadMsg={268} />
                      </span>
                    ),
                    key: "2",
                    children: "Tab 2",
                    disabled: true,
                  },
                  {
                    label: (
                      <span className="flex w-full gap-2 justify-between items-center">
                        <span>Disabled</span>
                        <Unread disabled unreadMsg={15} />
                      </span>
                    ),
                    key: "3",
                    children: "Tab 3",
                    disabled: true,
                  },
                ]}
                tabBarExtraContent={
                  <div className="flex gap-2 justify-end">
                    <Button
                      type="text"
                      icon={<Hamburger className="primary" />}
                    ></Button>
                    <Separator styles={{ margin: "2px 0", width: "2px" }} />
                    <Button
                      type="text"
                      icon={<Grid width={18} height={18} viewBox="0 0 18 18" />}
                    ></Button>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
