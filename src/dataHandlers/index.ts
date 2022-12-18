import { store } from "../rtk/store";
import { setDocuments } from "../rtk/features/documentSlice";
import { setAlert } from "../rtk/features/alertSlice";
import { Document } from "../types";
import axios from './axios'

export const fetchDocuments = () => {
  const endpoints = ['/documents1', '/documents2'];

  axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
    (data) => {
      let documents: Document[] = []
      data.forEach(resData => { documents = documents.concat(resData.data.data) })
      store.dispatch(setDocuments({ documents }));
    },
  );
};

interface CancelResponse {
  msg: string;
  success: boolean;
}

const handleCancelResponse = ({ msg, success }: CancelResponse) => {
  store.dispatch(setAlert({ msg, success }));

}

export const cancelDocuments = (ids: string[]) => {
  if (!Array.isArray(ids)) return false
  const body = { ids }
  axios.post("/cancel", body)
    .then(resData => handleCancelResponse(resData.data))
    .catch(() => handleCancelResponse({ msg: "Catch Error", success: false }))
};


