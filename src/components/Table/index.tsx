import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Document, HeadCell, Order } from "../../types";
import { Button, Typography } from "@mui/material";
import Dialog from "../Dialog";

import CustomTableHead from "./TableHead";
import CustomTableToolbar from "./TableToolbar";
import CustomTableBody from "./TableBody";

interface CustomTableProps {
  headCells: HeadCell[];
  rows: Document[];
  handleCanel: (ids: string[]) => void;
}

export default function CustomTable({
  headCells,
  rows,
  handleCanel,
}: CustomTableProps) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Document>("delivery_date");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  const itemsNames = useMemo(
    () =>
      rows
        .filter((row) => selected.includes(row.id))
        .map((row) => row.name)
        .join(", "),
    [selected, rows]
  );

  const getSumByKey = (key: keyof Document) =>
    rows.map((row) => Number(row[key])).reduce((sum, e) => sum + e, 0);

  const totlaVolum = useMemo(() => getSumByKey("volume"), [selected, rows]);
  const totlaQty = useMemo(() => getSumByKey("qty"), [selected, rows]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Document
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCancelButton = () => {
    handleCanel(selected);
    return;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <CustomTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <CustomTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <CustomTableBody
              headCells={headCells}
              rows={rows}
              order={order}
              orderBy={orderBy}
              selected={selected}
              setSelected={setSelected}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Table>
        </TableContainer>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography>{`Total Volume: ${totlaVolum}`}</Typography>
          <Typography>{`Total Quantity: ${totlaQty}`}</Typography>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
      <Box>
        {selected.length > 0 && (
          <Button style={{ background: "white" }} onClick={() => setOpen(true)}>
            Cancel
          </Button>
        )}
      </Box>
      <Dialog
        text={itemsNames}
        open={open}
        setOpen={setOpen}
        handleApprove={handleCancelButton}
      />
    </Box>
  );
}
