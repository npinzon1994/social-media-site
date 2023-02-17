import {configureStore} from '@reduxjs/toolkit';
import profileInfoReducer from './profile-info-slice';

const store = configureStore({
    reducer: {
        profileInfo: profileInfoReducer
    }
});

export default store;