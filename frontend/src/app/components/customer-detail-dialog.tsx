/* eslint-disable no-console */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useViewDetailCustomer } from "@/lib/hooks/useViewDetailCustomer";
import useUpdateTransaction from "@/lib/hooks/useUpdateTransaction";
import { formatIDR } from "@/lib/utils";
import { Customer } from "../interfaces/interface";

interface CustomerDetailDialogProps {
  customerId: number;
  onSave: (updatedCustomer: Customer) => void;
}

export function CustomerDetailDialog({
  customerId,
  onSave,
}: CustomerDetailDialogProps) {
  const [open, setOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
  const { data: customer } = useViewDetailCustomer(customerId);
  const { mutate: updateTransaction } = useUpdateTransaction();

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (!customer || isNaN(newQuantity) || newQuantity < 0) return;
    const updatedOrderHistory = [...customer.order_history];
    updatedOrderHistory[index].quantity = newQuantity;
    setEditedCustomer({ ...customer, order_history: updatedOrderHistory });
  };

  const handleSave = () => {
    if (!editedCustomer) return;

    editedCustomer.order_history.forEach((order) => {
      updateTransaction(
        { transactionId: order.transaction_id, quantity: order.quantity },
        {
          onSuccess: () => {
            console.log(
              "Transaction updated successfully:",
              order.transaction_id
            );
          },
          onError: (error) => {
            console.error("Error updating transaction:", error);
          },
        }
      );
    });

    onSave(editedCustomer);
    setOpen(false);
  };

  const handleCancel = () => {
    setEditedCustomer(customer || null);
    setOpen(false);
  };

  if (!customer) {
    return null; // Or render a loading state
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="w-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 13 13"
        >
          <path
            stroke="#292D32"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.895 5.775V4.06c0-.615-.47-1.295-1.045-1.51l-2.495-.935c-.415-.155-1.095-.155-1.51 0l-2.495.94c-.575.215-1.045.895-1.045 1.505v3.715c0 .59.39 1.365.865 1.72L5.32 11.1c.35.27.815.4 1.28.4"
          ></path>
          <path
            stroke="#292D32"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.6 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4M11.098 11h.004"
            opacity="0.4"
          ></path>
        </svg>
        Detail
      </Button>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <p>
              <span className="font-medium">Name:</span> {customer.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {customer.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {customer.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {customer.address}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Customer Status</h3>
            <div>
              <span className="font-medium">Level:</span>{" "}
              <Badge
                variant="secondary"
                className={
                  customer.level === "Warga"
                    ? "bg-orange-100 text-orange-800"
                    : customer.level === "Juragan"
                    ? "bg-blue-100 text-blue-800"
                    : customer.level === "Sultan"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }
              >
                {customer.level}
              </Badge>
            </div>
            <p>
              <span className="font-medium">Favorite Menu:</span>{" "}
              {customer.favorite_menu}
            </p>
            <p>
              <span className="font-medium">Total Transaction:</span> IDR{" "}
              {formatIDR(Number(customer?.total_transaction))}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Order History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.order_history?.map((product: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          Number.parseInt(e.target.value, 10)
                        )
                      }
                      className="w-20 h-8"
                      min="0"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
