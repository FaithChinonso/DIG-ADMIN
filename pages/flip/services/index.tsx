import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddService from "src/components/Forms/AddService";
import ParentContainer from "src/components/ParentContainer";
import useHTTPDelete from "src/Hooks/use-httpdelete";
import useHTTPGet from "src/Hooks/use-httpget";
import { useAppSelector } from "src/Hooks/use-redux";
import { addServices } from "src/redux/store/data-slice";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "../../../src/components/ActionMenu/ActionMenuBase";
import ActionMenuItem from "../../../src/components/ActionMenu/ActionMenuItem";
import DrawerCard from "../../../src/components/Drawer";
import FilterTable from "../../../src/components/filter-table";
import AddMerchant from "../../../src/components/Forms/AddMerchant";
import ModalAction from "../../../src/components/ModalContent/ModalAction";
import MultipleSelectTable from "../../../src/components/multiple-select-table";

import { uiActions } from "../../../src/redux/store/ui-slice";
import {
  analytics,
  statusData,
  tableData,
  tableLoad,
} from "../../../src/utils/analytics";

const Service = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const request = useHTTPGet();
  const remove = useHTTPDelete();
  const [isOpen, setIsOpen] = useState(false);
  const { services } = useAppSelector(state => state.data);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const fetchAllServices = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = "https://backendapi.flip.onl/api/admin/service/all-services";
    const dataFunction = (res: any) => {
      dispatch(addServices(res.data.data));
    };
    request({ url, accessToken }, dataFunction);
  };

  const editServices = async (id: any, endpoint: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/service/${endpoint}/${id}`;
    const dataFunction = (res: any) => {
      fetchAllServices();
    };
    request({ url, accessToken, alert: "send" }, dataFunction);
  };
  const deleteServices = async (id: any) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `https://backendapi.flip.onl/api/admin/service/delete-service/${id}`;
    const dataFunction = (res: any) => {
      fetchAllServices();
    };
    remove({ url, accessToken }, dataFunction);
  };

  type Data = {
    service: {
      serviceID: number;
      serial: string;
      serviceName: string;
      phoneNumber: string;
      pricing: string;
      location: string;
      yearsOfExperience: number;
      isActive: boolean;
      datePosted: string;
    };

    category: {
      name: string;
    };
  };
  const formatData = services
    ?.slice(0)
    .reverse()
    .map((client: any) => {
      return {
        id: client.service.serviceID,
        serial: client.service.serial,
        location: client.service.location,
        serviceName: client.service.serviceName,
        phoneNumber: client.service.phoneNumber,
        pricing: client.service.pricing,
        isActive: client.service.isActive,
        yearsOfExperience: client.service.yearsOfExperience,
        categoryName: client.category.name,
        datePosted: moment(client.service.datePosted).format("ll"),
      };
    });
  const columnDasboard = [
    {
      Header: "#",
      accessor: "serial",
    },
    {
      Header: "Service Name",
      accessor: "serviceName",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Pricing",
      accessor: "pricing",
      Cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.value || 0))}</div>
      ),
    },

    {
      Header: "Years Of Experience",
      accessor: "yearsOfExperience",
    },
    {
      Header: "Category",
      accessor: "categoryName",
    },
    {
      Header: "Date Posted",
      accessor: "datePosted",
    },
    ,
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
                    router.push(
                      `${location.pathname}/${prop?.row.original?.id}`
                    );
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
                                  editServices(
                                    prop?.row.original?.id,
                                    "deactivate-service"
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
                                  editServices(
                                    prop?.row.original?.id,
                                    "activate-service"
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
                  name="Delete Service"
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
                                deleteServices(prop?.row.original?.id)
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

  useEffect(() => {
    const fetchAllServices = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = "https://backendapi.flip.onl/api/admin/service/all-services";
      const dataFunction = (res: any) => {
        dispatch(addServices(res.data.data));
      };
      request({ url, accessToken }, dataFunction);
    };
    fetchAllServices();
  }, []);
  return (
    <ParentContainer>
      <DrawerCard title="Add Service" open={isOpen} toggleDrawer={toggleDrawer}>
        <AddService />
      </DrawerCard>
      <div className=" p-[10px] md:p-[30px]">
        <MultipleSelectTable
          columns={columnDasboard}
          data={formatData}
          emptyPlaceHolder="No services yet!"
          onClickFunction={toggleDrawer}
        />
      </div>
    </ParentContainer>
  );
};
export default Service;
