import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

const initialOrders = [
  {
    id: 1,
    totalLines: 10,
    orderNumber: "ORD001",
    effectiveDate: "2024-12-25",
  },
  {
    id: 2,
    totalLines: 3,
    orderNumber: "ORD002",
    effectiveDate: "2024-12-24",
  },
  {
    id: 3,
    totalLines: 2,
    orderNumber: "ORD003",
    effectiveDate: "2024-12-23",
  },
];

const PendingOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    setSelectedOrders(
      event.target.checked ? orders.map((order) => order.id) : []
    );
  };

  const handleDelete = () => {
    setOrders((prev) =>
      prev.filter((order) => !selectedOrders.includes(order.id))
    );
    setSelectedOrders([]);
    setDialogOpen(false);
  };

  const toggleDialog = () => {
    setDialogOpen((prev) => !prev);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedOrders.length > 0 &&
                    selectedOrders.length < orders.length
                  }
                  checked={
                    orders.length > 0 && selectedOrders.length === orders.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Total Lines </TableCell>
              <TableCell>Order Number</TableCell>
              <TableCell>Effective Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </TableCell>
                <TableCell>{order.totalLines}</TableCell>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.effectiveDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="error"
        onClick={toggleDialog}
        disabled={selectedOrders.length === 0}
        sx={{ marginTop: 2 }}
      >
        Delete
      </Button>

      <Dialog open={isDialogOpen} onClose={toggleDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedOrders.length} selected
            order(s)?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PendingOrders;
