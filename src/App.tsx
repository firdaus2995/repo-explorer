import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchUsers, fetchRepositories } from "./store/githubSlice.ts";
import React from "react";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, repositories, loading, error } = useSelector(
    (state: RootState) => state.github
  );

  const [search, setSearch] = useState("");
  const [openUser, setOpenUser] = useState<string | null>(null);

  const handleSearch = () => {
    if (search.trim() !== "") {
      dispatch(fetchUsers(search));
    }
  };

  const toggleDropdown = (username: string) => {
    if (openUser === username) {
      setOpenUser(null);
    } else {
      dispatch(fetchRepositories(username));
      setOpenUser(username);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-xl font-bold mb-4">GitHub Explorer</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Enter GitHub username..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-4">
          {users.map((user) => (
            <div key={user.id} className="border-b">
              <div
                className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                onClick={() => toggleDropdown(user.login)}
              >
                <p>{user.login}</p>
                <span>{openUser === user.login ? "▲" : "▼"}</span>
              </div>

              {openUser === user.login && repositories[user.login] && (
                <div className="mt-2 bg-gray-100 p-2 rounded-md shadow-md">
                  {repositories[user.login].length > 0 ? (
                    repositories[user.login].map((repo) => (
                      <div
                        key={repo.id}
                        className="p-2 border-b last:border-none"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold">{repo.name}</h3>
                          <span>{repo.stargazers_count} ⭐</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {repo.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No repositories found
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
