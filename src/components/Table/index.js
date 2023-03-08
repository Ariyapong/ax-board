import React, { useState } from "react";
import Image from "next/image";
import { Table, Space, Button, Input, Dropdown } from "antd";
import mockData from "@/mock/MOCK_DATA.json";
import Search from "@/assets/images/search.svg";
import Filter from "@/assets/images/filter.svg";
import MenuDown from "@/assets/images/menu-down.svg";
import VMore from "@/assets/images/v-more.svg";

const data = mockData;
function randomCate() {
  const categories = ["Notebook", "Watch", "Phone"];
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

const itemsDropdown = [
  {
    label: "Select Export",
    key: "2",
  },
];
export default function ProductTable() {
  const defaultFooter = () => "Here is footer";
  const showfooter = false;
  const ellipsis = false;
  const [hasData, setHasData] = useState(true);

  const columns = [
    {
      title: <span className="ax-text-gray">PRODUCT NAME</span>,
      dataIndex: "pname",
      filterIcon: <MenuDown />,
      className: "ax-text-black",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: () => {},
    },
    {
      title: <span className="ax-text-gray">PRODUCT NO</span>,
      dataIndex: "pno",
      filterIcon: <MenuDown />,
      className: "ax-text-gray",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: () => {},
      width: 150,
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: <span className="ax-text-gray">CATEGORY</span>,
      dataIndex: "category",
      filterIcon: <MenuDown />,
      className: "ax-text-black",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: () => {},
    },
    {
      title: <span className="ax-text-gray">DATE</span>,
      dataIndex: "date",
      filterIcon: <MenuDown />,
      className: "ax-text-gray",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: () => {},
    },
    {
      title: <span className="ax-text-gray">PRICE</span>,
      dataIndex: "price",
      filterIcon: <MenuDown />,
      className: "ax-text-black",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: () => {},
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: <span className="ax-text-gray">STATUS</span>,
      key: "status",
      filterIcon: <MenuDown />,
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: () => {},
      //   sorter: true,
      render: (data) => {
        return (
          <Space size="middle">
            <Button className="custom-btn borderless relative">
              <span
                className={`w-full h-full tb-action left-0 top-0 absolute btn-round`}
              ></span>
              <span className={`${data.status}`}>{data.status}</span>
            </Button>
            <Button
              type="text"
              icon={<VMore className="ax-text-gray" />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));

  const tableProps = {
    bordered: false,
    loading: false,
    size: "large",
    expandable: false,
    title: undefined,
    showHeader: true,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection: {},
    tableLayout: undefined,
  };

  return (
    <div className="bg-white product-table card-round p-6">
      <section className="grid grid-cols-12 pb-4">
        <div className="col-span-11 mr-8">
          <Input
            size="large"
            placeholder="Search products..."
            prefix={<Search className="ax-text-gray" />}
            suffix={<Filter className="ax-text-black" />}
          />
        </div>
        <div className="col-span-1">
          <Dropdown menu={{ items: itemsDropdown }}>
            <Button className="custom-btn items-center w-full">
              <span className="flex gap-2 items-center justify-evenly space-x-1 custom">
                <span className="ax-text-black">Actions</span>
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
      </section>
      <Table
        {...tableProps}
        pagination={{
          position: ["none", "bottomRight"],
          showTotal: function (total, range) {
            return (
              <span className="body-ligth">{`Showing ${range[0]} - ${range[1]} of ${total}`}</span>
            );
          },
          pageSizeOptions: [10, 20, 50, 100],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
      />
    </div>
  );
}
