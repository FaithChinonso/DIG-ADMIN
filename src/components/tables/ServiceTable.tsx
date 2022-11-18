import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch } from "src/Hooks/use-redux";
import {
  deleteservice,
  editservice,
} from "src/redux/store/features/service-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import AddService from "../Forms/AddService";
import ModalAction from "../ModalContent/ModalAction";
import MultipleSelectTable from "../multiple-select-table";

const ServiceTable = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleDrawer = () => {
    dispatch(
      uiActions.openDrawerAndSetContent({
        drawerStyles: {
          padding: 0,
        },
        drawerContent: (
          <>
            <AddService />
          </>
        ),
      })
    );
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
  const formatData = data
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
      name: "Serial",
      selector: "serial",
    },
    {
      name: "Service Name",
      selector: "serviceName",
    },
    {
      name: "Location",
      selector: "location",
    },
    {
      name: "Phone Number",
      selector: "phoneNumber",
    },
    {
      name: "Pricing",
      selector: "pricing",
      cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.pricing || 0))}</div>
      ),
    },

    {
      name: "Years Of Experience",
      selector: "yearsOfExperience",
    },
    {
      name: "Category",
      selector: "categoryName",
    },
    {
      name: "Date Posted",
      selector: "datePosted",
    },
    ,
    {
      name: "Action",
      selector: "action",
      Filter: false,
      cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                <ActionMenuItem
                  name="View More"
                  onClickFunction={() => {
                    router.push(`${location.pathname}/${prop?.id}`);
                  }}
                />

                {prop?.isActive === true ? (
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
                                item="service"
                                actionFunction={() =>
                                  dispatch(
                                    editservice({
                                      endpoint: "deactivate-service",
                                      serviceID: prop?.id,
                                    })
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
                                item="service"
                                actionFunction={() =>
                                  dispatch(
                                    editservice({
                                      endpoint: "activate-service",
                                      serviceID: prop?.id,
                                    })
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
                              item="service"
                              actionFunction={() =>
                                dispatch(deleteservice(prop?.id))
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

  return (
    <div>
      <div>
        {" "}
        <button
          onClick={toggleDrawer}
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center"
        >
          <span style={{ marginRight: "3px", translate: "0 3px" }}>
            {/* <Image src={Add} alt="" /> */}
          </span>
          Add Service
        </button>
      </div>
      <DataFilterTable columns={columnDasboard} data={formatData} />
    </div>
  );
};

export default ServiceTable;
