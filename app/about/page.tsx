import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="w-full px-6 py-16 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          About <span className="text-pink-600">Chef Rwanda</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Connecting you with Rwanda’s finest chefs, bringing passion and flavor to every meal.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden">
          <Image
            src="/chef.png"
            alt="About Chef Rwanda"
            fill
            className="object-contain"
          />
        </div>

        {/* Text */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Chef Rwanda is dedicated to connecting food enthusiasts with the country’s top culinary professionals.
            We aim to provide a platform where chefs can showcase their skills, and customers can find the perfect chef for any occasion.
          </p>

          <h2 className="text-2xl font-bold">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Discover verified and skilled chefs.</li>
            <li>Easy booking and direct communication.</li>
            <li>High-quality culinary experiences.</li>
            <li>Support local Rwandan talent.</li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <p className="text-lg font-medium">
          Ready to find your perfect chef? <span className="text-pink-600 font-bold">Get started today!</span>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
