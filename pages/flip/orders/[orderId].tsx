import { useRouter } from "next/router";
import location from "../../../src/assets/image/location.svg";
import quantity from "../../../src/assets/image/quantity.svg";
import cost from "../../../src/assets/image/cost.svg";
import date from "../../../src/assets/image/date.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import ActionList from "../../../src/components/ActionList";
import ParentContainer from "src/components/ParentContainer";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { MyOrderValue } from "src/utils/boxValues";
import { useEffect, useState } from "react";
import { orderApi } from "src/components/api";
import useHTTPGet from "src/Hooks/use-httpget";
import BuyerDetails from "src/components/BuyerDetails";
import ProductOrderDetails from "src/components/ProductOrderDetails";

const OneOrder = () => {
  const router = useRouter();
  const request = useHTTPGet();
  const [order, setOrder] = useState<any>({});
  const dispatch = useDispatch();
  const id = router.query.orderId;

  const fetchAnOrder = async (id: any) => {
    const url = `${orderApi}/single-order/${id}`;
    const accessToken = sessionStorage.getItem("accessToken");
    const dataFunction = (res: any) => {
      console.log(res);
      setOrder(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  };

  const [selected, setSelected] = useState(1);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchAnOrder(id);
  }, [id]);
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <ActionList />
        <div className="bg-darkPurple flex-col rounded-[20px] px-[8px] py-[23px] md:px-[38px] flex gap-5">
          {" "}
          <div className="text-offWhite text-lg">Overview</div>
          <div className="flex flex-col md:flex-row  justify-between  items-center">
            <div className="flex flex-col gap-[14px]">
              <div className="text-lg text-white font-semibold">
                OrderId:
                <span className="text-offWhite text-sm ml-2">
                  {" "}
                  {order?.orderID}
                </span>
              </div>

              <div className="text-offWhite text-sm">
                <span style={{ marginRight: "3px" }}>
                  <Image src={location} alt={""} />
                </span>
                {order?.deliveryAddress}
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <Image src={quantity} alt={""} />
              </div>
              <div>
                <div className="text-offWhite text-sm">Quantity Purchased</div>
                <div className="text-base text-white font-semibold mt-[10px]">
                  {order?.quantityPurchased}
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <Image src={cost} alt={""} />
              </div>
              <div>
                <div className="text-offWhite text-sm">Order Cost</div>
                <div className="text-base text-white font-semibold mt-[10px]">
                  {" "}
                  ₦{order?.price}
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <Image src={date} alt={""} />
              </div>
              <div>
                <div className="text-offWhite text-sm">Date and Time</div>
                <div className="text-base text-white font-semibold mt-[10px]">
                  {" "}
                  {order?.expectedDeliveryDate}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box
          sx={{ width: "100%" }}
          style={{ background: "white", height: "100vh" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              style={{ background: "#edf2f7" }}
              // classes={{ flexContainer: classes.flexContainer }}
            >
              {MyOrderValue.map(value => (
                <Tab
                  label={value.label}
                  {...a11yProps(value.id)}
                  key={value.id}
                  style={{
                    backgroundColor:
                      selected === value.id ? "white" : "transparent",
                    fontFamily: "Steradian",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "136.52%",
                    textAlign: "center",
                    color: "#979797",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    setSelected(value.id);
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <BuyerDetails data={order?.buyer} title="Buyer Profile" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductOrderDetails data={order?.product?.product} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BuyerDetails
              data={order?.product?.merchant}
              title="Merchant Information"
            />
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};

export default OneOrder;
