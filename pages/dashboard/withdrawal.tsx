import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import WithdrawalTable from "src/components/tables/WithdrawalTable";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { getMywithdrawal } from "src/redux/store/features/withdrawal-slice";

const Withdrawals = () => {
  const dispatch = useAppDispatch();
  const { withdrawals } = useAppSelector((state: any) => state.withdrawal);
  const { token } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMywithdrawal(token));
  }, [token]);
  return (
    <ParentContainer>
      <div>
        <WithdrawalTable data={withdrawals} />
      </div>
    </ParentContainer>
  );
};
export default Withdrawals;
