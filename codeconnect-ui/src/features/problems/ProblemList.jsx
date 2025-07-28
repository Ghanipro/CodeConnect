import { useEffect, useState } from "react";
import { getProblems } from "../../services/problemService";

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProblems();
        // Handle both old format (array) and new format (object with problems array)
        setProblems(data.problems || data);
      } catch (err) {
        setError("Failed to load problems. Please try again.");
        console.error("Error fetching problems:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Filter problems based on search term and difficulty
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === "All" || problem.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // Get difficulty badge styling with blue theme
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-50 text-green-700 border border-green-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "hard":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border border-blue-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <span className="text-blue-700 font-medium">
              Loading problems...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto pt-20">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 text-center">
            <div className="text-red-600 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔍 Search Problems
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type to search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="lg:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📊 Filter by Difficulty
                </label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">🟢 Easy</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Hard">🔴 Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Problems
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {problems.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Easy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {problems.filter((p) => p.difficulty === "Easy").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-yellow-100 p-6 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Medium</p>
                <p className="text-2xl font-bold text-gray-900">
                  {problems.filter((p) => p.difficulty === "Medium").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hard</p>
                <p className="text-2xl font-bold text-gray-900">
                  {problems.filter((p) => p.difficulty === "Hard").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        {filteredProblems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-12 text-center">
            <div className="text-blue-400 text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No problems found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterDifficulty !== "All"
                ? "Try adjusting your search criteria or filters to find more problems."
                : "No problems are currently available."}
            </p>
            {(searchTerm || filterDifficulty !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterDifficulty("All");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Problem Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Acceptance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {filteredProblems.map((problem, index) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-blue-25 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200 cursor-pointer group"
                      onClick={() => {
                        console.log(`Navigate to problem: ${problem.title}`);
                        // TODO: Add navigation to problem detail page
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {problem.title}
                        </div>
                        {problem.description && (
                          <div className="text-sm text-gray-500 mt-1 max-w-md truncate">
                            {problem.description}
                          </div>
                        )}
                        {problem.tags && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {problem.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags.length > 2 && (
                              <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                +{problem.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyStyle(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {problem.acceptance_rate ? (
                          <span className="text-green-600 font-medium">
                            {problem.acceptance_rate}%
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md group-hover:scale-105">
                          Solve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-blue-600 font-medium">
            💡 Click on any problem to start solving!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProblemList;
