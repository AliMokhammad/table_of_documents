import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../rtk/store";
import { filterDocuments } from "../../rtk/features/documentSlice";
import "./styles.css";

const Search = (props: any) => {
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      filterDocuments({
        query: (event.target as HTMLInputElement).value.toLowerCase(),
      })
    );
  };
  return (
    <Box
      className={"searchBox"}
      sx={{
        display: { xs: "none", md: "flex" },
      }}
    >
      <TextField
        className={"searchText"}
        placeholder="Search…"
        type="text"
        onChange={handleChange}
      />
      <SearchIcon className={"searchIcon"} />
    </Box>
  );
};
export default Search;
