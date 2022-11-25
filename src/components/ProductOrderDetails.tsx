import React from "react";

const ProductOrderDetails = ({ data }: any) => {
  return (
    <div>
      <div className="text-2xl text-darkPurple font-bold">Product Details</div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Product ID</div>
            <div className="text-md">{data?.productID}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Product Name</div>
            <div className="text-md">{data?.name}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Brand</div>
            <div className="text-md">{data?.brand}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm">
              {" "}
              Discount Available
            </div>
            <div className="text-md">{data?.discount?.isDiscountAvailable}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm">
              {" "}
              Discount Percentage
            </div>
            <div className="text-md">{data?.discount?.discountPercentage}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Discount Amount</div>
            <div className="text-md">{data?.discount?.discountAmount}</div>
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Descriprtion</div>
            <div className="text-md">{data?.description}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Quantity</div>
            <div className="text-md">{data?.quatity}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm">Price</div>
            <div className="text-md"> ₦{data?.price}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Weight</div>
            <div className="text-md">{data?.weight}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Product Warranty</div>
            <div className="text-md">{data?.productWarranty}</div>
          </div>
          <div className="flex ">
            <div className="w-[200px] text-text text-sm"> Free Delivery</div>
            <div className="text-md">{data?.delivery?.freeDelivery}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrderDetails;
