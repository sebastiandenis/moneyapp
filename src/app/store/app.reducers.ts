import { ActionReducerMap } from '@ngrx/store';
import * as fromStoreData from './reducers/storeDataReducer';
import * as fromUiState from './reducers/uiStateReducer';

export interface AppState {
    uiState: fromUiState.State,
    storeData: fromStoreData.State
}

export const reducers: ActionReducerMap<AppState> = {
    storeData: fromStoreData.storeData,
    uiState: fromUiState.uiState
};