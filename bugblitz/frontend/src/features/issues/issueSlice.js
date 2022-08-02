import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	issues: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const createIssue = createAsyncThunk(
	'/issue/create',
	async (issueData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await issueService.createIssue(issueData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const issueSlice = createSlice({
	name: 'issue',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
