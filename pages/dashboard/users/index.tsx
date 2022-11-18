import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParentContainer from "src/components/ParentContainer";

import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import AddJob from "src/components/Forms/AddJob";
import {
  deleteuser,
  edituser,
  getMyuser,
} from "src/redux/store/features/user-slice";
import UserTable from "src/components/tables/UserTable";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: any) => state.user);
  const { token } = useAppSelector((state: any) => state.auth);
  console.log(token);
  useEffect(() => {
    dispatch(getMyuser(token));
  }, [dispatch]);

  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <UserTable data={users} />
      </div>
    </ParentContainer>
  );
};
export default Users;
