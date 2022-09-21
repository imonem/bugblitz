import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import issueService from '../issues/issueService';

const initialState = {
	issues: [],
	issue: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const createIssue = createAsyncThunk(
	'issues/create',
	async (issueData, thunkAPI) => {
		try {
			const token = await thunkAPI.getState().auth.user.token;
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

//Display issues
export const listIssues = createAsyncThunk(
	'issues/listAll',
	async (_, thunkAPI) => {
		try {
			const token = await thunkAPI.getState().auth.user.token;
			return await issueService.listIssues(token);
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

//Todo create the delete issue
//Get one issue
export const getIssue = createAsyncThunk('issues/', async (id, thunkAPI) => {
	try {
		const token = await thunkAPI.getState().auth.user.token;
		return await issueService.getIssue(id, token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		console.log(error);
		return thunkAPI.rejectWithValue(message);
	}
});

//Issue slice
export const issueSlice = createSlice({
	name: 'issue',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createIssue.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createIssue.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.issues.push(action.payload);
			})
			.addCase(createIssue.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(listIssues.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(listIssues.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.issues = action.payload;
			})
			.addCase(listIssues.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getIssue.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getIssue.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.issue = action.payload;
			})
			.addCase(getIssue.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
