import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import api from "../services/api";
import IdeaCard from "../components/IdeaCard";

const SearchResults = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [params] = useSearchParams();
  const keyword = params.get("keyword");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/ideas/search?keyword=${keyword}`);
        setIdeas(res.data.ideas);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [keyword]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-[#0A1931] tracking-tight">
          Search Results
        </h1>
        <p className="mt-2 text-gray-500">
          {loading ? (
            "Searching..."
          ) : (
            <>
              {ideas.length} result{ideas.length !== 1 && "s"} for{" "}
              <span className="font-medium text-gray-700">"{keyword}"</span>
            </>
          )}
        </p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : ideas.length > 0 ? (
        <div className="flex flex-col gap-4">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-10 py-16 text-center shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
            <svg
              className="h-7 w-7 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0z"
              />
            </svg>
          </div>
          <p className="mb-1 text-lg font-medium text-gray-800">
            No ideas found
          </p>
          <p className="mb-6 max-w-sm text-sm text-gray-500">
            Try a different keyword, or head back home to browse what's
            already there.
          </p>
          <Link to="/homepage">
            <button className="inline-flex items-center gap-2 rounded-md bg-[#0A1931] px-6 py-3 text-white font-medium tracking-wide transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
              Go back home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;