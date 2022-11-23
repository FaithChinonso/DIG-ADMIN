import moment from "moment";
import React from "react";
import { useAppDispatch } from "src/Hooks/use-redux";
import { deleteproduct } from "src/redux/store/features/product-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { product } from "src/utils/analytics";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import AddProductFeature from "../Forms/AddProductFeature";
import AddProductImages from "../Forms/AddProductImages";
import AddProductSpec from "../Forms/AddProductSpec";
import CreateProduct from "../Forms/CreateProduct";
import ModalAction from "../ModalContent/ModalAction";
import MultipleSelectTable from "../multiple-select-table";
import ProductDetails from "../ProductDetails";

const ProductTable = ({ data }: any) => {
  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    dispatch(
      uiActions.openDrawerAndSetContent({
        drawerStyles: {
          padding: 0,
        },
        drawerContent: (
          <>
            <CreateProduct title="Create Product" />
          </>
        ),
      })
    );
  };

  type Data = {
    product: {
      productID: number;
      serial: string;
      name: string;
      weight: number;
      price: number;
      brand: string;
      specifications: any[];
      features: any[];
      images: any[];
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
  const formatData = data
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
        categoryName: client?.category?.name,
        productCreationDate: moment(client.productCreationDate).format("ll"),
        isActive: client.product.isActive,
        numberOfOrders: client.product.numberOfOrders,
        freeDelivery: client.product.delivery.freeDelivery,
        shippingFee: client.product.delivery.shippingFee,
        description: client.product.description,
        specifications: client.product.specifications,
        features: client.product.features,
        images: client.product.images,
      };
    });
  console.log(formatData);
  const columnProduct = [
    {
      name: "#",
      selector: "serial",
    },
    {
      name: "Product Name",
      selector: "name",
    },
    {
      name: "Brand",
      selector: "brand",
    },
    {
      name: "product Quantity",
      selector: "quantity",
    },
    {
      name: "Price",
      selector: "price",
      cell: (prop: any) => {
        console.log(prop);
        return <div> ₦{prop.price}</div>;
      },
    },
    {
      name: "Product Weight (kg)",
      selector: "weight",
      cell: (prop: any) => <div> {prop.weight}</div>,
    },
    {
      name: "Warranty",
      selector: "productWarranty",
    },
    {
      name: "Created On",
      selector: "productCreationDate",
    },
    {
      name: "Category Name",
      selector: "categoryName",
    },
    {
      name: "Orders",
      selector: "numberOfOrders",
    },

    {
      name: "Action",
      selector: "action",

      cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                <ActionMenuItem
                  name="View More"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <ProductDetails data={prop} />
                          </>
                        ),
                      })
                    );
                  }}
                />
                <ActionMenuItem
                  name="Update Product"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <CreateProduct
                              title="Update Product"
                              id={prop?.id}
                            />
                          </>
                        ),
                      })
                    );
                  }}
                />

                {prop.specifications.length > 0 ? (
                  <ActionMenuItem
                    name="Edit Product Specification"
                    onClickFunction={() => {
                      dispatch(
                        uiActions.openDrawerAndSetContent({
                          drawerStyles: {
                            padding: 0,
                          },
                          drawerContent: (
                            <>
                              <AddProductSpec
                                id={prop?.id}
                                title="Edit Product Specification"
                                existingSpec={prop.specifications}
                              />
                            </>
                          ),
                        })
                      );
                    }}
                  />
                ) : (
                  <ActionMenuItem
                    name="Add Product Specification"
                    onClickFunction={() => {
                      dispatch(
                        uiActions.openDrawerAndSetContent({
                          drawerStyles: {
                            padding: 0,
                          },
                          drawerContent: (
                            <>
                              <AddProductSpec
                                id={prop?.id}
                                title="Add Product Specification"
                              />
                            </>
                          ),
                        })
                      );
                    }}
                  />
                )}

                {prop.features.length > 0 ? (
                  <ActionMenuItem
                    name="Edit Product Feature"
                    onClickFunction={() => {
                      dispatch(
                        uiActions.openDrawerAndSetContent({
                          drawerContent: (
                            <>
                              <AddProductFeature
                                id={prop?.id}
                                title="Edit Product Feature"
                                existingFeature={prop.features}
                              />
                            </>
                          ),
                        })
                      );
                    }}
                  />
                ) : (
                  <ActionMenuItem
                    name="Add Product Feature"
                    onClickFunction={() => {
                      dispatch(
                        uiActions.openDrawerAndSetContent({
                          drawerContent: (
                            <>
                              <AddProductFeature
                                id={prop?.id}
                                title="Add Product Feature"
                              />
                            </>
                          ),
                        })
                      );
                    }}
                  />
                )}

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
                                item="product"
                                actionFunction={() =>
                                  dispatch(
                                    editproduct({
                                      endPoint: "deactivate-product",
                                      productID: prop?.id,
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
                                item="product"
                                actionFunction={() =>
                                  dispatch(
                                    editproduct({
                                      endPoint: "activate-product",
                                      productID: prop?.id,
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
                  name="Add Product Images"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerContent: (
                          <>
                            <AddProductImages
                              id={prop?.id}
                              title="Add Product Images"
                            />
                          </>
                        ),
                      })
                    );
                  }}
                />

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
                                dispatch(deleteproduct(prop?.id))
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
          Add Product
        </button>
      </div>
      <DataFilterTable columns={columnProduct} data={formatData} />
    </div>
  );
};

export default ProductTable;
