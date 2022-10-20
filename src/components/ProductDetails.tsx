import Image from "next/image";
import productPic from "../assets/image/productpic.svg";

const ProductDetails = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mb-4">
        <Image src={productPic} />
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-3">
          <div className="text-xs text-[#8487A3]">Product Name</div>
          <div className="text-base text-[#090F47]">Cefimix</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xs text-[#8487A3]">Product ID</div>
          <div className="text-base text-[#090F47]">90384038CF</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xs text-[#8487A3]">Product Quantity</div>
          <div className="text-base text-[#090F47]">20 Tablets</div>
        </div>
      </div>
      <div className="flex justify-between mt-5 w-full">
        <div className="flex flex-col gap-3">
          <div className="text-xs text-[#8487A3]"> Product Weight</div>
          <div className="text-base text-[#090F47]">Cefimix</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xs text-[#8487A3]">Delivery Tag</div>
          <div className="text-base text-[#090F47]">0.4 kg</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xs text-[#8487A3]">Price (per unit)</div>
          <div className="text-base text-[#090F47]">₦ 3,000.00</div>
        </div>
      </div>
      <div className="flex justify-between mt-5 w-full">
        <div className="flex flex-col gap-3">
          <div className="text-xs text-[#8487A3]">Status</div>
          <div className="text-base text-[#090F47]">Under Review</div>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-xs text-[#8487A3] mb-5">Product Description</div>
        <div className="text-base text-[#090F47]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. A ut posuere
          purus ultrices facilisi enim pretium. Malesuada consequat varius
          facilisi faucibus. Turpis eget sagittis, sed maecenas commodo sed
          habitasse imperdiet. Vel, turpis est vestibulum mauris placerat.{" "}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
