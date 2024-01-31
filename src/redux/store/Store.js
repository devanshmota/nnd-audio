import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import UsersSlice from '../reducer/UsersSlice';
import apiMiddleware from '../middleware/api'; 
import LanguageSlice from '../reducer/LanguageSlice';
import CachedataSlice from '../reducer/CachedataSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ 
    users: UsersSlice.reducer, 
    language: LanguageSlice.reducer,
    cachedata: CachedataSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         })
// })

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(
            {
                serializableCheck: false
            }
        ),
        apiMiddleware, // Add your custom middleware here
    ],
});

export const persistor = persistStore(store)