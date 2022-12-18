import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Document, HeadCell, Order } from "../../types";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface CustomTableBodyProps {
  headCells: HeadCell[];
  rows: Document[];
  order: Order;
  orderBy: keyof Document;
  page: number;
  rowsPerPage: number;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CustomTableBody({
  rows,
  headCells,
  order,
  orderBy,
  page,
  rowsPerPage,
  selected,
  setSelected,
}: CustomTableBodyProps) {
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const renderValue = (row: Document, key: keyof Document) => {
    let text = "";
    switch (key) {
      case "total":
        text = `${row.sum + row.qty} ${row.currency}`;
        break;
      case "delivery_date":
        text = new Date(row.delivery_date).toDateString();
        break;
      default:
        text = row[key].toString();
        break;
    }
    return <TableCell align="center">{text}</TableCell>;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableBody>
      {rows
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row.id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </TableCell>
              {headCells
                .map((headCell) => headCell.id)
                .map((key) => renderValue(row, key))}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
