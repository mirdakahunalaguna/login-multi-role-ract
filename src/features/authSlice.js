// Mengimpor fungsi-fungsi yang diperlukan dari Redux Toolkit dan Axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mendefinisikan state awal untuk slice ini
const initialState = {
    user: null,        // Informasi pengguna yang sedang login
    isError: false,    // Menyimpan status kesalahan
    isSuccess: false,  // Menyimpan status keberhasilan
    isLoading: false,  // Menyimpan status sedang memuat
    message: ""        // Pesan kesalahan atau informasi tambahan
}

// Membuat thunk untuk operasi login asynchronous
export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        // Melakukan permintaan HTTP untuk login
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });

        // Mengembalikan data pengguna jika login berhasil
        return response.data;
    } catch (error) {
        // Tangani kesalahan, dan kirimkan pesan kesalahan ke state
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Membuat thunk untuk mendapatkan informasi pengguna
export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        // Melakukan permintaan HTTP untuk mendapatkan informasi pengguna
        const response = await axios.get('http://localhost:5000/me');

        // Mengembalikan data pengguna
        return response.data;
    } catch (error) {
        // Tangani kesalahan, dan kirimkan pesan kesalahan ke state
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Membuat thunk untuk operasi logout asynchronous
export const LogOut = createAsyncThunk("user/LogOut", async () => {
  try {
    // Melakukan permintaan HTTP untuk logout
    await axios.delete('http://localhost:5000/logout');
    
    // Mengembalikan true untuk menunjukkan keberhasilan logout
    return true;
  } catch (error) {
    // Tangani kesalahan, atau kembalikan false jika logout gagal
    return false;
  }
});

// Membuat slice Redux untuk manajemen state autentikasi
export const authSlice = createSlice({
    name: "auth",        // Nama slice
    initialState,        // State awal
    reducers:{
        reset: (state) => initialState   // Action creator untuk mereset state ke nilai awal
    },
    extraReducers: (builder) => {
        // Menangani perubahan state yang terjadi karena thunks atau actions lainnya
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;  // Menetapkan status memuat ketika login dimulai
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            // Menetapkan status selesai dan memperbarui data pengguna ketika login berhasil
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            // Menetapkan status selesai dan status kesalahan jika login gagal
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;  // Menetapkan status memuat ketika pengambilan data pengguna dimulai
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            // Menetapkan status selesai dan memperbarui data pengguna ketika pengambilan data pengguna berhasil
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            // Menetapkan status selesai dan status kesalahan jika pengambilan data pengguna gagal
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

// Ekspor action creators dan reducer dari slice ini
export const { reset } = authSlice.actions;
export default authSlice.reducer;
