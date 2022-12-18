import { HeadCell } from "../../types";

const headCells: HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "status",
        numeric: false,
        disablePadding: true,
        label: "Status",
    },
    {
        id: "sum",
        numeric: true,
        disablePadding: false,
        label: "Sum",
    },
    {
        id: "qty",
        numeric: true,
        disablePadding: false,
        label: "Qty",
    },
    {
        id: "volume",
        numeric: true,
        disablePadding: false,
        label: "Volume",
    },

    {
        id: "delivery_date",
        numeric: false,
        disablePadding: false,
        label: "Delivery Date",
    },
    {
        id: "currency",
        numeric: true,
        disablePadding: false,
        label: "Currency",
    },
    {
        id: "total",
        numeric: true,
        disablePadding: false,
        label: "Total",
    },
];

export default headCells