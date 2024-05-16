import { configureStore } from '@reduxjs/toolkit';
import Saltdata from './Saltdata';



export const store = configureStore({
    reducer : {
        Saltdata: Saltdata
    }
})

