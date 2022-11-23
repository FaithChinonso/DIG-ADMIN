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
import { getMyservice } from "src/redux/store/features/service-slice";
import {
  deleteproduct,
  editproduct,
  getMyproduct,
} from "src/redux/store/features/product-slice";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";
import ProductTable from "src/components/tables/ProductTable";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";

const Products = () => {
  const dispatch = useDispatch();

  const { products } = useAppSelector((state: any) => state.product);
  const { token } = useAppSelector((state: any) => state.auth);

  const [selected, setSelected] = useState(1);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getMyproductCategories(token));
    dispatch(getMyproduct(token));
  }, [dispatch]);
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
            <ProductTable data={products} />
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
