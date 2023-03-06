import React from "react";

export default function Headline(props) {
  return (
    <div className="grid grid-cols-12 gap-2 pb-4 items-center">
      <div className="col-span-8 text-2rem">{props.title || "Section"}</div>
      <div className="col-span-4 justify-self-end">
        {/* <Dropdown
          loading={loadings[1]}
          menu={{
            items,
          }}
        >
          <Button className="custom-btn">
            <span className="flex gap-2 items-center space-x-1 custom">
              <Image
                priority
                src="/images/card-logo.svg"
                height={15}
                width={15}
                alt="date picker"
              />
              <span>5880 **** **** 8854</span>
              <Image
                priority
                src="/images/arrow-ddl-down.svg"
                height={10}
                width={10}
                alt="dropdown trigger"
              />
            </span>
          </Button>
        </Dropdown> */}
        {props.children}
      </div>
    </div>
  );
}
