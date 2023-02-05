import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  hasAlert: false,
  errorMsg: "",
  warningMsg: "",
  infoMsg: "",
  successMsg: ""
}

const globalAlertSlice = createSlice({
  name: 'globalAlert',
  initialState,
  reducers: {
    setErrorMsg(state, action: PayloadAction<string>) {
      resetMsg();
      state.errorMsg = action.payload;
      state.hasAlert = true;
    },
    setWarningMsg(state, action: PayloadAction<string>) {
      resetMsg();
      state.warningMsg = action.payload;
      state.hasAlert = true;
    },
    setInfoMsg(state, action: PayloadAction<string>) {
      resetMsg();
      state.infoMsg = action.payload;
      state.hasAlert = true;
    },
    setSuccessMsg(state, action: PayloadAction<string>) {
      resetMsg();
      state.successMsg = action.payload;
      state.hasAlert = true;
    },
    resetMsg(state) {
      state.errorMsg = "";
      state.warningMsg = "";
      state.infoMsg = "";
      state.successMsg = "";
    }
  }
});

export const {
  setErrorMsg,
  setWarningMsg,
  setInfoMsg,
  setSuccessMsg,
  resetMsg
} = globalAlertSlice.actions;

export default globalAlertSlice.reducer;