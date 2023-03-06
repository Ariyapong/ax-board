import styles from "./layout-dashboard.module.scss";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/assets/styles/dashboard.module.scss";

import { Layout, Menu, theme, Avatar, Select, Button } from "antd";
import Unread from "@/components/Unread";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

// import { useRouter } from 'next/router'
import Link from "next/link";
import Search from "@/assets/images/search.svg";
import Notification from "@/assets/images/notification.svg";
import Hamburger from "@/assets/images/menu.svg";
import Grid from "@/assets/images/grid.svg";
import Shopping from "@/assets/images/cart.svg";
import Calendar from "@/assets/images/calendar.svg";
import Mail from "@/assets/images/mail.svg";
import Chat from "@/assets/images/chat.svg";
import Task from "@/assets/images/tasks.svg";
import Project from "@/assets/images/project.svg";
import Text from "@/assets/images/text.svg";
import Folder from "@/assets/images/folder.svg";
import Contact from "@/assets/images/contacts.svg";
import Dot from "@/assets/images/dot.svg";

const { Header, Sider, Content } = Layout;

export default function Dashboard(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // menu list
  const items = [
    {
      key: "1",
      icon: <Grid />,
      label: <Link href="/">Dashboard</Link>,
    },
    // {
    //   key: "2",
    //   icon: <Shopping viewBox="0 0 18 18" width="18" height="18" />,
    //   label: "E-Commerce",
    // },
    getItem(
      "E-Commerce",
      "2",
      <Shopping viewBox="0 0 18 18" width="18" height="18" />,
      [
        getItem(<Link href="/product">Products</Link>, "sub2-1", <Dot />),
        getItem("Orders", "sub2-2", <Dot />),
        getItem("Customers", "sub2-3", <Dot />),
      ]
    ),
    {
      key: "3",
      // icon: <UploadOutlined />,
      icon: <Calendar viewBox="0 0 18 18" width="18" height="18" />,
      label: "Calendar",
    },
    {
      key: "4",
      icon: <Mail viewBox="0 0 18 18" width="18" height="18" />,
      label: (
        <span className="flex w-full justify-between">
          <span>Mail</span> <Unread unreadMsg={8} />
        </span>
        // <div className="flex items-center justify-between">
        //   <div>Mail</div>{" "}
        //   <div className={`${styles.notiLabel} text-xs text-center text-white`}>
        //     8
        //   </div>
        // </div>
      ),
    },
    {
      key: "5",
      icon: <Chat viewBox="0 0 18 18" width="18" height="18" />,
      label: "Chat",
    },
    {
      key: "6",
      icon: <Task viewBox="0 0 18 18" width="18" height="18" />,
      label: "Tasks",
    },
    {
      key: "7",
      icon: <Project viewBox="-2 0 18 18" width="18" height="18" />,
      label: "Projects",
    },
    {
      key: "8",
      icon: <Folder viewBox="0 0 18 18" width="18" height="18" />,
      label: "File Manager",
    },
    {
      key: "9",
      icon: <Text viewBox="-3 0 18 18" width="18" height="18" />,
      label: "Notes",
    },
    {
      key: "10",
      icon: <Contact viewBox="0 0 18 18" width="18" height="18" />,
      label: "Contacts",
    },
  ];

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  return (
    <main className={props.classProps}>
      <Header
        className={styles.dashboard}
        style={{ padding: 0, background: "#074E9F", height: "65px" }}
      >
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-6 px-4">
            <div className="grid grid-cols-12 h-full items-center">
              <div className="col-span-6">
                <div className={` flex space-x-4 items-center`}>
                  {/* {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: styles.trigger,
                      onClick: () => setCollapsed(!collapsed),
                    }
                  )} */}
                  <Button
                    title=""
                    type="text"
                    icon={
                      <span className="text-white">
                        <Hamburger fill="currentColor" />
                      </span>
                    }
                    onClick={() => setCollapsed(!collapsed)}
                  ></Button>

                  <div className="flex">
                    <Image
                      priority
                      src="/images/Logo.svg"
                      height={40}
                      width={40}
                      alt="Follow us on Twitter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6 px-4 self-center">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <div
                  className={`${styles.userAction} flex space-x-4 justify-end items-center`}
                >
                  <Button
                    type="text"
                    shape="circle"
                    icon={<Search aria-label="search icon" />}
                  />
                  <Button
                    type="text"
                    shape="circle"
                    icon={<Notification aria-label="notification icon" />}
                  />
                  <div className={styles.separator}></div>
                  <div className={styles.userProfile}>
                    <Avatar
                      src="/images/user.png"
                      alt="user"
                      style={{ width: "45px", height: "45px" }}
                    />
                    <Select
                      className="grow"
                      defaultValue="Art Template"
                      // style={{ width: '100%' }}
                      bordered={false}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>
      <Layout className={styles.myLayout}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={270}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              //   margin: "24px 16px",
              margin: "2rem",
              //   padding: 24,
              minHeight: 280,
              //   background: colorBgContainer,
            }}
          >
            {/* <span className="text-red-600 font-bold">Content</span> */}
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
