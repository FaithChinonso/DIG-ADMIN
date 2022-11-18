import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import TransactionTable from "src/components/tables/TransactionTable";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  getMyTransactions,
  getPaystackTransactions,
  getWalletTransactions,
} from "src/redux/store/features/transaction-slice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { MyTransactionValue } from "src/utils/boxValues";

const Transaction = () => {
  const { walletTransactions, paystackTransactions } = useAppSelector(
    state => state.transaction
  );
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState(1);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getWalletTransactions(token));
    dispatch(getPaystackTransactions(token));
  }, [dispatch]);

  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
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
              {MyTransactionValue.map(value => (
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
            <TransactionTable data={walletTransactions} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TransactionTable data={paystackTransactions} />
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export default Transaction;
