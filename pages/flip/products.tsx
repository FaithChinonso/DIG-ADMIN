import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParentContainer from "src/components/ParentContainer";
import ActionMenuBase from "../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../src/components/Drawer";
import FilterTable from "../../src/components/filter-table";
import CreateProduct from "../../src/components/Forms/CreateProduct";
import ModalAction from "../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../src/components/multiple-select-table";
import ProductDetails from "../../src/components/ProductDetails";
import { uiActions } from "../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
  product,
} from "../../src/utils/analytics";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { MyProductValue } from "../../src/utils/boxValues";
import AddProductCategory from "src/components/Forms/AddProductCategory";
import ProductCategory from "src/components/ProductCategory";

const Products = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const accessToken = useSelector((state: any) => state.data.signinDetails);
  const [drawerDetails, setDraweDetails] = useState({
    title: "",
    isAdd: false,
  });

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [selected, setSelected] = useState(1);
  const useStyles = makeStyles({
    flexContainer: {
      alignItems: "center",
      justifyContent: "space-between !important",
    },
    check: {
      padding: "0px",
    },
  });

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const columnProduct = [
    {
      Header: "#",
      accessor: "serial",
      Filter: false,
    },
    {
      Header: "product Name",
      accessor: "productName",
    },
    {
      Header: "product ID",
      accessor: "productId",
    },
    {
      Header: "product Quantity",
      accessor: "productQuantity",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Product Weight",
      accessor: "productWeight",
    },
    {
      Header: "Delivery Tag",
      accessor: "deliveryTag",
    },

    {
      Header: "Action",
      accessor: "action",
      Filter: false,
      Cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                <ActionMenuItem
                  name="View More"
                  onClickFunction={() => {
                    setIsOpen(!isOpen);
                    setDraweDetails({
                      ...drawerDetails,
                      title: "Product Details",
                      isAdd: false,
                    });
                  }}
                />

                <ActionMenuItem
                  name="Add New Product feature"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Suspend" item="product" />
                          </>
                        ),
                      })
                    )
                  }
                />

                <ActionMenuItem
                  name="Deactivate"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Deactivate" item="product" />
                          </>
                        ),
                      })
                    )
                  }
                />

                <ActionMenuItem
                  name="Under Review"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction action="Review" item="product" />
                          </>
                        ),
                      })
                    )
                  }
                />
              </>
            }
          />
        );
      },
    },
  ];
  const toggleDrawerAdd = () => {
    setIsOpen(!isOpen);
    setDraweDetails({
      ...drawerDetails,
      title: "Create Product",
      isAdd: true,
    });
  };

  const toggleDrawerCategory = () => {};
  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px] h-screen">
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
              {MyProductValue.map((value: any) => (
                <Tab
                  label={value.label}
                  {...a11yProps(value.id)}
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
            <ProductCategory accessToken={accessToken} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DrawerCard
              title={drawerDetails.title}
              open={isOpen}
              toggleDrawer={toggleDrawer}
            >
              {drawerDetails.isAdd ? <CreateProduct /> : <ProductDetails />}
            </DrawerCard>
            <MultipleSelectTable
              columns={columnProduct}
              data={product}
              emptyPlaceHolder="No products yet!"
              extraButton={{ text: "Create Product" }}
              onClickFunction={toggleDrawerAdd}
            />
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export default Products;
