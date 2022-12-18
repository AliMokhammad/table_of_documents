import { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { fetchDocuments, cancelDocuments } from "../../dataHandlers";
import { useAppSelector } from "../../rtk/store";
import HeadCells from "./HeadCells";
import { Table } from "../../components";

function DocumentsData() {
  const { documents: rows } = useAppSelector((state) => state.documentSlice);

  useEffect(fetchDocuments, []);

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", backgroundColor: "#E7EBF0" }}>
      <Container maxWidth="lg">
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={12} mt={8} mb={3}>
            <Table
              headCells={HeadCells}
              rows={[...rows]}
              handleCanel={cancelDocuments}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DocumentsData;
