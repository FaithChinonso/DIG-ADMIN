import Image from "next/image";
import productPic from "../assets/image/productpic.svg";
import DrawerWrapper from "./DrawerWrapper";

const ProductDetails = ({ data }: any) => {
  return (
    <DrawerWrapper title="Product Detail">
      <div className="flex flex-col items-center">
        <div className="mx-auto mb-4">
          <Image src={productPic} alt={""} />
        </div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">Product Name</div>
            <div className="text-base text-[#090F47]">{data.name}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">Product ID</div>
            <div className="text-base text-[#090F47]">{data.seriel}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-[#8487A3]">Product Quantity</div>
            <div className="text-base text-[#090F47]">{`${data.quantity} ${data.name}`}</div>
          </div>
        </div>
        <div className="flex justify-between mt-5 w-full">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text"> Product Weight</div>
            <div className="text-base text-text">{data.weight}kg</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text">Delivery Tag</div>
            <div className="text-base text-text">{data.freeDelivery}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text">Price (per unit)</div>
            <div className="text-base text-text">₦ {data.price}</div>
          </div>
        </div>
        <div className="flex justify-between mt-5 w-full">
          <div className="flex flex-col gap-3">
            <div className="text-xs text-text">Warranty</div>
            <div className="text-base text-text">{data.producWarranty}</div>
          </div>
        </div>
        {data?.specifications?.length !== 0 ? (
          <div className=" mt-5 w-full">
            <div className="text-darkPurple text-lg text-center">
              Product Specification
            </div>
            <div className="flex justify-between mt-5 w-full">
              {data?.specifications?.map((item: any) => (
                <div className="mt-5">
                  <div className="text-xs text-text mb-5">
                    {item?.specification.title}
                  </div>
                  <div className="text-base text-text">
                    {item?.specification.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {data?.features?.length !== 0 ? (
          ""
        ) : (
          <div className=" mt-5 w-full">
            <div className="text-darkurple text-lg text-center">Features</div>
            <div className="flex justify-between mt-5 w-full">
              {data?.features?.map((item: any) => (
                <div className="mt-5">
                  <div className="text-xs text-text mb-5">
                    {item?.feature.title}
                  </div>
                  <div className="text-base text-text">
                    {item?.specification.value}
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
        )}
      </div>
    </DrawerWrapper>
  );
};
export default ProductDetails;
