import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CarerRef {
  carerId: string;
  firstName: string;
  lastName: string;
}

interface SelectedCarerState {
  carerId: string | null;
  firstName: string;
  lastName: string;
  carerList: CarerRef[];
}

const initialState: SelectedCarerState = {
  carerId: null,
  firstName: "",
  lastName: "",
  carerList: [],
};

const selectedCarerSlice = createSlice({
  name: "selectedCarer",
  initialState,
  reducers: {
    setCarerContext: (
      state,
      action: PayloadAction<{
        carerId: string;
        carerList: CarerRef[];
      }>,
    ) => {
      const current = action.payload.carerList.find(
        (c) => c.carerId === action.payload.carerId,
      );

      state.carerId = action.payload.carerId;
      state.carerList = action.payload.carerList;
      state.firstName = current?.firstName || "";
      state.lastName = current?.lastName || "";
    },

    goToNextCarer: (state) => {
      if (!state.carerId) return;

      const index = state.carerList.findIndex(
        (c) => c.carerId === state.carerId,
      );

      if (index >= 0 && index < state.carerList.length - 1) {
        const next = state.carerList[index + 1];
        state.carerId = next.carerId;
        state.firstName = next.firstName;
        state.lastName = next.lastName;
      }
    },

    goToPreviousCarer: (state) => {
      if (!state.carerId) return;

      const index = state.carerList.findIndex(
        (c) => c.carerId === state.carerId,
      );

      if (index > 0) {
        const prev = state.carerList[index - 1];
        state.carerId = prev.carerId;
        state.firstName = prev.firstName;
        state.lastName = prev.lastName;
      }
    },

    clearCarerContext: (state) => {
      state.carerId = null;
      state.firstName = "";
      state.lastName = "";
      state.carerList = [];
    },
  },
});

export const {
  setCarerContext,
  goToNextCarer,
  goToPreviousCarer,
  clearCarerContext,
} = selectedCarerSlice.actions;

export default selectedCarerSlice.reducer;
