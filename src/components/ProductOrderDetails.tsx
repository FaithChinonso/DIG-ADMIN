import React from "react";

const ProductOrderDetails = ({ data }: any) => {
  return (
    <div>
      <div className="text-xl text-darkPurple font-bold">Product Details</div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Product ID</div>
            <div className="text-sm">{data?.productID}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Product Name</div>
            <div className="text-sm">{data?.name}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Brand</div>
            <div className="text-sm">{data?.brand}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs">
              {" "}
              Discount Available
            </div>
            <div className="text-sm">{data?.discount?.isDiscountAvailable}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs">
              {" "}
              Discount Percentage
            </div>
            <div className="text-sm">{data?.discount?.discountPercentage}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Discount Amount</div>
            <div className="text-sm">{data?.discount?.discountAmount}</div>
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Descriprtion</div>
            <div className="text-sm">{data?.description}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Quantity</div>
            <div className="text-sm">{data?.quatity}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs">Price</div>
            <div className="text-sm"> ₦{data?.price}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Weight</div>
            <div className="text-sm">{data?.weight}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Product Warranty</div>
            <div className="text-sm">{data?.productWarranty}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-xs"> Free Delivery</div>
            <div className="text-sm">{data?.delivery?.freeDelivery}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrderDetails;
