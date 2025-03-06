import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  login: string;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

interface GithubState {
  users: User[];
  repositories: { [key: string]: Repository[] };
  loading: boolean;
  error: string | null;
}

const initialState: GithubState = {
  users: [],
  repositories: {},
  loading: false,
  error: null,
};

// Fetch users
export const fetchUsers = createAsyncThunk(
  "github/fetchUsers",
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${search}&per_page=5`
      );
      const data = await response.json();
      return data.items;
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

// Fetch repositories for a user
export const fetchRepositories = createAsyncThunk(
  "github/fetchRepositories",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      return { username, repos: data };
    } catch (error) {
      return rejectWithValue("Failed to fetch repositories");
    }
  }
);

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.repositories[action.payload.username] = action.payload.repos;
      });
  },
});

export default githubSlice.reducer;
