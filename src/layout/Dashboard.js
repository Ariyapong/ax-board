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
import MenuDown from "@/assets/images/menu-down.svg";


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
      label: (
        <>
          <div className={`active-indicator absolute left-0 top-0`}></div>
          <Link className="ax-text-black" href="/">
            Dashboard
          </Link>
        </>
      ),
    },
    getItem(
      <>
        <div className={`active-indicator absolute left-0 top-0`}></div>
        <span className="ax-text-black">E-Commerce</span>
      </>,
      "2",
      <Shopping viewBox="0 0 18 18" width="18" height="18" />,
      [
        getItem(<Link href="/product">Products</Link>, "sub2-1", <Dot />),
        getItem(<Link href="">Orders</Link>, "sub2-2", <Dot />),
        getItem(<Link href="">Customers</Link>, "sub2-3", <Dot />),
      ]
    ),
    {
      key: "3",
      // icon: <UploadOutlined />,
      icon: <Calendar viewBox="0 0 18 18" width="18" height="18" />,
      label: (
        <>
          <div className={`active-indicator absolute left-0 top-0`}></div>
          <span>Calendar</span>
        </>
      ),
    },
    {
      key: "4",
      icon: <Mail viewBox="0 0 18 18" width="18" height="18" />,
      label: (
        <>
          <div className="active-indicator absolute left-0 top-0"></div>
          <span className="flex w-full justify-between">
            <span>Mail</span> <Unread unreadMsg={8} />
          </span>
        </>
      ),
    },
    {
      key: "5",
      icon: <Chat viewBox="0 0 18 18" width="18" height="18" />,
      label: (
        <>
          <div className="active-indicator absolute left-0 top-0"></div>
          <span>Chat</span>
        </>
      ),
    },
    {
      key: "6",
      icon: <Task viewBox="0 0 18 18" width="18" height="18" />,
      label: (
        <>
          <div className="active-indicator absolute left-0 top-0"></div>
          <span>Tasks</span>
        </>
      ),
    },
    {
      key: "7",
      icon: <Project viewBox="-2 0 18 18" width="18" height="18" />,
      label: (
        <>
          <div className="active-indicator absolute left-0 top-0"></div>
          <span>Projects</span>
        </>
      ),
    },
    {
      key: "8",
      icon: <Folder viewBox="0 0 18 18" width="18" height="18" />,
      label: (
        <>
          <div className="active-indicator absolute left-0 top-0"></div>
          <span>File Manager</span>
        </>
      ),
    },
    {
      key: "9",
      icon: <Text viewBox="-3 0 18 18" width="18" height="18" />,
      label: (
        <>
          <div className="active-indicator absolute left-0 top-0"></div>
          <span>Notes</span>
        </>
      ),
    },
    {
      key: "10",
      icon: <Contact viewBox="0 0 18 18" width="18" height="18" />,
      label: (
        <>
          <div className="active-indicator absolute left-0 top-0"></div>
          <span>Contacts</span>
        </>
      ),
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
                    icon={
                      <Search className="text-white" aria-label="search icon" />
                    }
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
                      className="grow header-ddl"
                      defaultValue="Art Template"
                      // style={{ width: '100%' }}
                      bordered={false}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                      ]}
                      suffixIcon={<MenuDown className="text-white" />}
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
            className="h-full"
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ position: "relative" }}
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
