import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all items (with optional search query)
export const fetchItems = createAsyncThunk('items/fetchItems', async (query = '') => {
  const response = await fetch(`/api/items${query}`);
  return await response.json();
});

// Add a new item
export const addItem = createAsyncThunk('items/addItem', async (newItem) => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });
  return await response.json();
});

// Delete an item
export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  await fetch(`/api/items?id=${id}`, { method: 'DELETE' });
  return id;
});

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add item
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Delete item
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default itemSlice.reducer;
