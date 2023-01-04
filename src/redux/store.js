import { configureStore } from "@reduxjs/toolkit";
import IsErrorReducer from "./reducers/IsErrorReducer";
import IsLoadingReducer from "./reducers/IsLoadingReducer";
import PrimaryCityReducer from "./reducers/PrimaryCityReducer";
import SecondaryCitiesReducer from "./reducers/SecondaryCitiesReducer";


const store = configureStore({
    reducer: {
        primaryCity: PrimaryCityReducer,
        secondaryCities: SecondaryCitiesReducer,
        isError: IsErrorReducer,
        isLoading: IsLoadingReducer
    }
})

export default store