import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Document } from "../../types";

interface DocumentSlice {
  documents: Document[];
  originalDocuments: Document[];
}

const initialState: DocumentSlice = {
  documents: [],
  originalDocuments: [],
};

export const documentSlice = createSlice({
  name: "documentSlice",
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<{ documents: any }>) => {
      state.documents = action.payload.documents;
      state.originalDocuments = action.payload.documents;
    },
    filterDocuments: (state, action: PayloadAction<{ query: string }>) => {
      const { query } = action.payload;
      if (!query.length) {
        state.documents = state.originalDocuments
        return
      }
      let res = state.originalDocuments.filter((item) => {
        if (
          Object.values(item).filter((value) =>
            value.toString().toLocaleLowerCase().includes(query)
          ).length
        )
          return item;
        return false
      });

      state.documents = res.length ? res : [];

    },
  },
});

export const { setDocuments, filterDocuments } = documentSlice.actions;

export default documentSlice.reducer;
