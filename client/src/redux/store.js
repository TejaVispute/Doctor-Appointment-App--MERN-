import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/featureSlice";

export default configureStore({
    reducer: {
        alerts: alertSlice.reducer,
        user: userSlice.reducer
    }
})