import ChefSearch from "@/components/ChefSearch";
import ChefsView from "@/components/chefsView";

export default function ChefPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full flex justify-center px-5 py-16">
        <div className="w-full max-w-6xl bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-lg p-10 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-pink-500">
            Find Your Next Chef Here
          </h1>

          <p className="text-gray-600 max-w-2xl text-base md:text-lg">
            Explore thousands of job opportunities in Rwanda and beyond.
            Your dream chef job is just one search away.
          </p>

          <div className="w-full max-w-xl">
            <ChefSearch />
          </div>
        </div>
      </div>

      {/* Chefs Grid */}
      <div className="w-full max-w-7xl mx-auto px-5 pb-16">
        <ChefsView />
      </div>
    </div>
  );
}
