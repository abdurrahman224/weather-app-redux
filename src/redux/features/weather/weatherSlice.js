import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  weatherData: null,
  loading: false,
  error: null,

}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  const apiKey = '3c0e79d8b192e8417f6def8c4ae65b79';
  const respose = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?q=${city}&units=metric&appid=${apiKey}`,
  );

  const data = await respose.json();
  return data;



})
 
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchWeather.pending, (state) => {

      state.loading = true,
      state.error = null

    })
    .addCase(fetchWeather.fulfilled,(state,action)=>{
      state.loading = false,
      state.weatherData.push(action.payload)

    })
    .addCase(fetchWeather.rejected,(state,action)=>{
      state.loading = false,
      state.error = action.error.message

    })
  }
})