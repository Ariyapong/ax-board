import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/assets/styles/dashboard.module.scss";

import variables from "@/assets/styles/_variables.module.scss";

import { Layout, Menu, theme, Row, Col, Avatar, Select } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function Dashboard(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <main>
      <Header
        className={styles.dashboard}
        style={{ padding: 0, background: "#074E9F", height: "65px" }}
      >
        <Row>
          <Col span={12} className="px-4">
            <Row justify="start" align="middle">
              <Col span={2}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: styles.trigger,
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </Col>
              <Col span={2}>
                <div className={styles.xflex}>
                  <Image
                    priority
                    src="/images/Logo.svg"
                    height={40}
                    width={40}
                    alt="Follow us on Twitter"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={12} className="px-4">
            <Row justify="end" align="middle" className="h-full">
              <Col span={24}>
                {/* <div className={styles.userAction}></div> */}
                <Row justify="end" align="middle" className={`w-full`}>
                  <Col span={4} className={styles.fixHeight}>
                    <Row justify="end">
                      <Col>action</Col>
                    </Row>
                  </Col>
                  <Col
                    span={1}
                    className={`px-6 justify-items-center" ${styles.fixHeight}`}
                  >
                    <div className={styles.separator}></div>
                  </Col>
                  <Col span={6} className={styles.fixHeight}>
                    <div className={styles.userProfile}>
                      <Avatar src="/images/user.png" alt="user" />
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
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      <Layout className={styles.myLayout}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
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
