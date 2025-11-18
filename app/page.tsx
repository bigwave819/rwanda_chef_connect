import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const services = [
    {
      id: 1,
      name: "Home Cooking",
      imageUrl: "/home.png",
      description: "Enjoy freshly cooked meals in the comfort of your home."
    },
    {
      id: 2,
      name: "Events Cooking",
      imageUrl: "/events.png",
      description: "Perfect cooking services for weddings, birthdays, and events."
    },
    {
      id: 3,
      name: "Party Cooking",
      imageUrl: "/part.png",
      description: "We handle full party meal preparation with professionalism."
    },
  ];

  return (
    <>
      {/* Landing Section (unchanged) */}
      <section className="w-full flex justify-center px-6 py-20">
        <div className="max-w-5xl flex flex-col-reverse md:flex-row items-center gap-10">

          {/* Left text content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Find the best chef to make your party unforgettable
            </h2>

            <p className="text-gray-600 text-lg">
              On this platform, you will find skilled chefs ready to help you prepare delicious meals for any event.
            </p>

            <Button className="btn">
              Hire a Chef
            </Button>
          </div>

          {/* Images */}
          <div className="flex-1 relative flex justify-center">
            <Image
              src="/blob.svg"
              alt="blob"
              width={500}
              height={500}
              className="absolute -z-10 opacity-80"
            />
            <Image
              src="/chef.png"
              alt="chef"
              width={320}
              height={320}
              className="rounded-2xl drop-shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-14">

          {/* Image Side */}
          <div className="flex justify-center">
            <Image
              src="/serving.png"
              alt="About our chef service"
              width={420}
              height={420}
            />
          </div>

          {/* Text Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Us
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              We connect you with professional chefs who specialize in cooking for
              events, parties, and home dining. Our mission is to provide delicious,
              well-prepared meals while making your event stress-free.
              <br /><br />
              Our chefs bring passion, experience, and creativity to your kitchen —
              ensuring that every meal becomes a meaningful part of your celebration.
            </p>
          </div>

        </div>
      </section>


      {/* Services Section (improved) */}
      <section className="px-6 py-20 mt-14">
        <div className="max-w-6xl mx-auto text-center space-y-6">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Here Are the Services You Can Find on This Platform
          </h2>

          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We offer professional chefs and cooking services for different needs and occasions.
          </p>

          {/* Grid of services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">

            {services.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200"
              >
                <div className="flex justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={140}
                    height={140}
                    className="rounded-xl"
                  />
                </div>

                <h4 className="text-xl font-semibold text-gray-900 mt-4">
                  {item.name}
                </h4>

                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
            Why Choose Our Chefs?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-pink-700">Professional Chefs</h3>
              <p className="text-gray-600 mt-3">All chefs are trained and experienced in handling different cuisines and events.</p>
            </div>

            <div className=" p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-pink-700">Affordable Packages</h3>
              <p className="text-gray-600 mt-3">We offer pocket-friendly packages without compromising quality.</p>
            </div>

            <div className="p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-pink-700">Reliable & On Time</h3>
              <p className="text-gray-600 mt-3">We ensure your meals are prepared and served right on schedule.</p>
            </div>

          </div>

        </div>
      </section>

    </>
  );
}
