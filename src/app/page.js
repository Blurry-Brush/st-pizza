import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";
import { useUser } from "@clerk/nextjs";
export default function Home() {
  

  return (
    <main>
      <Hero />
      <HomeMenu />
      <section className="text-center my-8">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About us"} />
        <div className="max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            iure dolore delectus, dicta nulla ex voluptate accusantium
            repellendus quas beatae?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
            nam, qui eligendi porro magnam id sequi in, ipsum voluptates dolores
            doloribus architecto magni perspiciatis autem!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
            dolor placeat molestias autem iure ea.
          </p>
        </div>
      </section>

      <section className="text-center">
        <SectionHeaders
          subHeader={"Dont't Hesitate"}
          mainHeader={"Contact Us"}
        />

        <div className="mt-4">
          <a
            className="text-xl underline text-gray-500"
            href="tel:+469192123123"
          >
            +46 91912123123
          </a>
        </div>
      </section>
    </main>
  );
}
