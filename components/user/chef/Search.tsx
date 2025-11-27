"use client";

import { useState, useEffect } from "react";
import ChefCard from "./Card";
import { getTheChefs } from "@/app/actions/admin-action";

interface Chef {
  id: string;
  name: string;
  speciality: string;
  phone: string | null;
  imageUrl?: string;
}

const ChefSearch = () => {
  const [query, setQuery] = useState("");
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(false);

  // Live search with 1.5s debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await getTheChefs(query);
        setChefs(data);
      } catch (err) {
        console.error(err);
        setChefs([]);
      } finally {
        setLoading(false);
      }
    }, 1000); // <-- 1.5 seconds debounce

    return () => clearTimeout(timer); // cleanup previous timeout
  }, [query]);

  return (
    <div className="w-full px-6 py-10">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Discover <span className="text-pink-600">Top Chefs</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Search, filter and hire Rwanda’s top cooking professionals.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto mt-8">
        <input
          type="text"
          placeholder="Search a chef or speciality..."
          className="w-full py-3 px-4 rounded-3xl bg-white shadow-xl border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="text-center text-gray-600">
          {chefs.length} chef{chefs.length !== 1 ? "s" : ""} found
          {query && ` for "${query}"`}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ChefCard key={i} loading />)
            : chefs.length > 0
            ? chefs.map((chef) => <ChefCard key={chef.id} {...chef} />)
            : query && <div className="col-span-full text-center py-12 text-gray-500">No chefs found.</div>}
        </div>
      </div>
    </div>
  );
};

export default ChefSearch;
