import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParentContainer from "src/components/ParentContainer";
import { uiActions } from "../../src/redux/store/ui-slice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MyProductValue } from "../../src/utils/boxValues";
import ProductCategory from "src/components/ProductCategory";
import { useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  getMyproduct,
} from "src/redux/store/features/product-slice";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";
import ProductTable from "src/components/tables/ProductTable";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error, message, success } = useAppSelector(
    (state: any) => state.product
  );
  const { token } = useAppSelector((state: any) => state.auth);

  const [selected, setSelected] = useState(1);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
        })
      );
      setTimeout(() => {
        dispatch(clearError());
      }, 10000);
    }
    if (success) {
      dispatch(
        uiActions.openModalAndSetContent({
          modalContent: (
            <>
              <SuccessfulModal title="Successful" message={message} />
            </>
          ),
        })
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
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
