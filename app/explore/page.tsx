"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Star, MapPin, BadgeCheck, Clock, Phone, ChefHat, Filter } from "lucide-react";
import { Button } from "../../components/ui/button";

// SAMPLE DATA
const chefs = [
  {
    id: 1,
    name: "Chef Aline",
    specialty: "Traditional Rwandan Cuisine",
    rating: 4.9,
    experience: 7,
    location: "Kigali, Rwanda",
    price: "$45/hr",
    tags: ["Rwandan", "Buffet", "Vegetarian"],
    verified: true,
    image: "/chef1.jpg",
  },
  {
    id: 2,
    name: "Chef Hassan",
    specialty: "BBQ & Grilled Dishes",
    rating: 4.7,
    experience: 5,
    location: "Huye, Rwanda",
    price: "$35/hr",
    tags: ["BBQ", "Smoked", "Outdoor"],
    verified: false,
    image: "/chef2.jpg",
  },
  {
    id: 3,
    name: "Chef Diane",
    specialty: "Cakes & Pastries",
    rating: 5.0,
    experience: 10,
    location: "Musanze, Rwanda",
    price: "$60/hr",
    tags: ["Cakes", "Pastries", "Events"],
    verified: true,
    image: "/chef3.jpg",
  },
];

const categories = ["All", "Traditional", "Cakes", "BBQ", "Events", "Pastries", "Buffet"];

const ExplorePage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredChefs = chefs.filter((chef) => {
    const matchesSearch =
      chef.name.toLowerCase().includes(query.toLowerCase()) ||
      chef.specialty.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || chef.tags.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full px-6 py-10">

      {/* PAGE TITLE */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900">
        Discover <span className="text-pink-600">Top Chefs</span> Around You
      </h1>
      <p className="text-center text-gray-500 mt-2 text-lg">
        Search, filter and hire Rwanda’s top cooking professionals.
      </p>

      {/* SEARCH BAR */}
      <div className="max-w-xl mx-auto mt-8 relative">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search a chef or specialty..."
          className="w-full py-3 pl-12 pr-4 rounded-3xl bg-white shadow-xl border
                     focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition
              ${activeCategory === cat
                ? "bg-pink-500 text-white border-pink-500 shadow-md"
                : "bg-white border-gray-300 hover:bg-pink-50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CHEF GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
        {filteredChefs.map((chef) => (
          <div
            key={chef.id}
            className="bg-white rounded-3xl shadow-xl p-5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden">
              <Image
                src={chef.image}
                alt={chef.name}
                fill
                className="object-cover"
              />
            </div>

            {/* HEADER */}
            <div className="flex items-center justify-between mt-4">
              <h2 className="text-2xl font-bold">{chef.name}</h2>
              {chef.verified && (
                <BadgeCheck className="text-pink-500" size={22} />
              )}
            </div>

            <p className="text-gray-500 mt-1">{chef.specialty}</p>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-2">
              <Star size={20} className="text-yellow-500" />
              <span className="font-semibold">{chef.rating}</span>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={18} />
                <span>{chef.experience} yrs exp</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} />
                <span>{chef.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <ChefHat size={18} />
                <span>{chef.price}</span>
              </div>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-4">
              {chef.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <Button className="w-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-full">
                View Profile
              </Button>
              <Button className="w-1/2 bg-white border border-pink-500 text-pink-600 hover:bg-pink-50 rounded-full">
                <Phone size={18} /> Contact
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredChefs.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          No chefs found for your search.
        </p>
      )}

      {/* HOW IT WORKS SECTION */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          How <span className="text-pink-600">It Works</span>
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          We make hiring professional chefs fast, reliable, and stress-free.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
          <div className="p-6 rounded-3xl shadow-lg bg-white">
            <Search className="mx-auto text-pink-600" size={40} />
            <h3 className="text-xl font-bold mt-4">Search</h3>
            <p className="text-gray-500 mt-2">Find chefs for any event or cuisine.</p>
          </div>

          <div className="p-6 rounded-3xl shadow-lg bg-white">
            <ChefHat className="mx-auto text-pink-600" size={40} />
            <h3 className="text-xl font-bold mt-4">Choose</h3>
            <p className="text-gray-500 mt-2">Compare ratings, skills and reviews.</p>
          </div>

          <div className="p-6 rounded-3xl shadow-lg bg-white">
            <Phone className="mx-auto text-pink-600" size={40} />
            <h3 className="text-xl font-bold mt-4">Hire</h3>
            <p className="text-gray-500 mt-2">Book and contact your chef instantly.</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked <span className="text-pink-600">Questions</span>
        </h2>

        <div className="space-y-4">
          <details className="p-4 bg-white shadow-md rounded-xl">
            <summary className="font-semibold cursor-pointer">How do I hire a chef?</summary>
            <p className="mt-2 text-gray-500">Search, choose a chef, and contact them directly.</p>
          </details>

          <details className="p-4 bg-white shadow-md rounded-xl">
            <summary className="font-semibold cursor-pointer">Are the chefs verified?</summary>
            <p className="mt-2 text-gray-500">Yes, all verified chefs have a badge on their profile.</p>
          </details>

          <details className="p-4 bg-white shadow-md rounded-xl">
            <summary className="font-semibold cursor-pointer">Do chefs travel?</summary>
            <p className="mt-2 text-gray-500">Most chefs travel anywhere within Rwanda.</p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
