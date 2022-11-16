import { useEffect, useState } from "react";
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
import useHTTPGet from "src/Hooks/use-httpget";
import { addProductCategory, addProducts } from "src/redux/store/data-slice";
import { useAppSelector } from "src/Hooks/use-redux";
import moment from "moment";
import { numberWithCommas } from "src/utils/formatNumber";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import AddProductSpec from "src/components/Forms/AddProductSpec";

const Products = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSpec, setIsSpec] = useState(false);
  const [productId, setproductId] = useState();
  const [drawerDetails, setDraweDetails] = useState({
    title: "",
    isAdd: false,
    data: {},
  });
  const request = useHTTPGet();
  const remove = useHTTPDelete();
  const { products } = useAppSelector((state: any) => state.data);
  const fetchAllProducts = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/product/all-products`;
    const dataFunction = (res: any) => {};
    request({ url, accessToken }, dataFunction);
  };

  const editProduct = async (id: any, endpoint: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/product/${endpoint}/${id}`;
    const dataFunction = (res: any) => {
      fetchAllProducts();
    };
    request({ url, accessToken, alert: "send" }, dataFunction);
  };
  const deleteProduct = async (id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/product/delete-product/${id}`;
    const dataFunction = (res: any) => {
      fetchAllProducts();
    };
    remove({ url, accessToken }, dataFunction);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawerSpec = () => {
    setIsSpec(!isSpec);
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

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  type Data = {
    product: {
      productID: number;
      serial: string;
      name: string;
      weight: number;
      price: number;
      brand: string;
      productWarranty: string;
      quantity: number;
      numberOfOrders: number;
      delivery: {
        freeDelivery: string;
        shippingFee: number;
      };
      discount: {
        isDiscountAvailable: string;
        discountPercentage: string;
        discountAmount: string;
      };
      description: string;
      isActive: boolean;
    };

    category: {
      name: string;
    };
    productCreationDate: string;
  };
  const formatData = products
    ?.slice(0)
    .reverse()
    .map((client: Data, index: number) => {
      return {
        id: client.product.productID,
        serial: client.product.serial,
        brand: client.product.brand,
        name: client.product.name,
        weight: client.product.weight,
        quantity: client.product.quantity,
        productWarranty: client.product.productWarranty,
        price: client.product.price,
        categoryName: client.category.name,
        productCreationDate: moment(client.productCreationDate).format("ll"),
        isActive: client.product.isActive,
        numberOfOrders: client.product.numberOfOrders,
        freeDelivery: client.product.delivery.freeDelivery,
        shippingFee: client.product.delivery.shippingFee,
        description: client.product.description,
      };
    });
  console.log(formatData);
  const columnProduct = [
    {
      Header: "#",
      accessor: "serial",
    },
    {
      Header: "Product Name",
      accessor: "name",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "product Quantity",
      accessor: "quantity",
    },
    {
      Header: "Price",
      accessor: "price",
      Cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.value || 0))}</div>
      ),
    },
    {
      Header: "Product Weight (kg)",
      accessor: "weight",
      Cell: (prop: any) => <div> {prop.value}</div>,
    },
    {
      Header: "Warranty",
      accessor: "productWarranty",
    },
    {
      Header: "Created On",
      accessor: "productCreationDate",
    },
    {
      Header: "Category Name",
      accessor: "categoryName",
    },
    {
      Header: "Orders",
      accessor: "numberOfOrders",
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
                      data: prop?.row?.original,
                    });
                  }}
                />
                <ActionMenuItem
                  name="Add Product Feature"
                  onClickFunction={() => {
                    toggleDrawerSpec();
                    setproductId(prop?.row.original?.id);
                  }}
                />

                {prop?.row.original?.isActive === true ? (
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
                              <ModalAction
                                action="Deactivate"
                                item="product"
                                actionFunction={() =>
                                  editProduct(
                                    prop?.row.original?.id,
                                    "deactivate-product"
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                ) : (
                  <ActionMenuItem
                    name="Activate"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="Activate"
                                item="product"
                                actionFunction={() =>
                                  editProduct(
                                    prop?.row.original?.id,
                                    "activate-product"
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                )}

                <ActionMenuItem
                  name="Delete Product"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              action="delete"
                              item="product"
                              actionFunction={() =>
                                deleteProduct(prop?.row.original?.id)
                              }
                            />
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

  useEffect(() => {
    const fetchAllProducts = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = "https://backendapi.flip.onl/api/admin/product/all-products";
      const dataFunction = (res: any) => {
        dispatch(addProducts(res.data.data));
      };
      request({ url, accessToken }, dataFunction);
    };
    const fetchAllCategory = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url =
        "https://backendapi.flip.onl/api/admin/productcategory/all-product-categories";
      const dataFunction = (res: any) => {
        dispatch(addProductCategory(res.data.data));
      };
      request({ url, accessToken }, dataFunction);
    };
    fetchAllProducts();
    fetchAllCategory();
  }, []);
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
            <DrawerCard
              title={drawerDetails.title}
              open={isOpen}
              toggleDrawer={toggleDrawer}
            >
              {drawerDetails.isAdd ? (
                <CreateProduct />
              ) : (
                <ProductDetails data={drawerDetails.data} />
              )}
            </DrawerCard>
            <DrawerCard
              title="Add Product Specification"
              open={isSpec}
              toggleDrawer={toggleDrawerSpec}
            >
              <AddProductSpec id={productId} />
            </DrawerCard>
            <MultipleSelectTable
              columns={columnProduct}
              data={formatData}
              emptyPlaceHolder="No products yet!"
              onClickFunction={toggleDrawerAdd}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductCategory />
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export default Products;
