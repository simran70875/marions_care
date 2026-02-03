import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerRef {
  customerId: string;
  firstName: string;
  lastName: string;
}

interface SelectedCustomerState {
  customerId: string | null;
  firstName: string;
  lastName: string;
  customerList: CustomerRef[];
}

const initialState: SelectedCustomerState = {
  customerId: null,
  firstName: "",
  lastName: "",
  customerList: [],
};

const selectedCustomerSlice = createSlice({
  name: "selectedCustomer",
  initialState,
  reducers: {
    setCustomerContext: (
      state,
      action: PayloadAction<{
        customerId: string;
        customerList: CustomerRef[];
      }>,
    ) => {
      const current = action.payload.customerList.find(
        (c) => c.customerId === action.payload.customerId,
      );

      state.customerId = action.payload.customerId;
      state.customerList = action.payload.customerList;
      state.firstName = current?.firstName || "";
      state.lastName = current?.lastName || "";
    },

    goToNextCustomer: (state) => {
      if (!state.customerId) return;

      const index = state.customerList.findIndex(
        (c) => c.customerId === state.customerId,
      );

      if (index >= 0 && index < state.customerList.length - 1) {
        const next = state.customerList[index + 1];
        state.customerId = next.customerId;
        state.firstName = next.firstName;
        state.lastName = next.lastName;
      }
    },

    goToPreviousCustomer: (state) => {
      if (!state.customerId) return;

      const index = state.customerList.findIndex(
        (c) => c.customerId === state.customerId,
      );

      if (index > 0) {
        const prev = state.customerList[index - 1];
        state.customerId = prev.customerId;
        state.firstName = prev.firstName;
        state.lastName = prev.lastName;
      }
    },

    clearCustomerContext: (state) => {
      state.customerId = null;
      state.firstName = "";
      state.lastName = "";
      state.customerList = [];
    },
  },
});

export const {
  setCustomerContext,
  goToNextCustomer,
  goToPreviousCustomer,
  clearCustomerContext,
} = selectedCustomerSlice.actions;

export default selectedCustomerSlice.reducer;
