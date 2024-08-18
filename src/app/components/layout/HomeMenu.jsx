import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import prisma from "../../../utils/db";

async function HomeMenu() {
  const menuItems = await prisma.menuItem.findMany();
  const categories = await prisma.category.findMany();
  return (
    <section className="">
      <div className="absolute w-full left-0 right-0">
        <div className="absolute left-0 -top-20 -z-10">
          <Image src={"/sallad1.png"} width={109} height={189} alt="sallad" />
        </div>
        <div className="absolute right-0 -top-36 -z-10">
          <Image src={"/sallad2.png"} width={107} height={195} alt="sallad" />
        </div>
      </div>

      <div className="text-center mb-10">
        <SectionHeaders subHeader={"check out"} mainHeader={"menu"} />
      </div>

      {categories.map((category, index) => {
        const filteredMenuItems = menuItems.filter(
          (menuItem) => menuItem.category === category.category
        );
        console.log(category, filteredMenuItems);
        if (filteredMenuItems.length === 0) return null;
        return (
          <div key={index}>
            <div className="text-center mb-4">
              <SectionHeaders mainHeader={category.category} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {filteredMenuItems.map((menuItem, index) => {
                return <MenuItem item={menuItem} key={index} />;
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default HomeMenu;
