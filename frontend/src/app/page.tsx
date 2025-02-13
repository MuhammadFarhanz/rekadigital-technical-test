"use client";

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
import { Filter, RefreshCw, Pencil } from "lucide-react";
import { Sidebar } from "./components/sidebar";
import { TopMenu } from "./components/top-menu";
import { AddCustomerDialog } from "./components/add-customer-dialog";
import { CustomerDetailDialog } from "./components/customer-detail-dialog";
import { DeleteConfirmationDialog } from "./components/delete-confirmation-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllCustomers } from "@/lib/hooks/useGetAllCustomers";
import { useDeleteCustomer } from "@/lib/hooks/useDeleteCustomer";
import { formatIDR } from "@/lib/utils";

interface Product {
  name: string;
  quantity: number;
}

interface Customer {
  id: number;
  name: string;
  level: string;
  favorite_menu: string;
  totalTransaction: number;
  email: string;
  phone: string;
  address: string;
  products: any;
}

export default function CustomerDashboard() {
  const mutation = useDeleteCustomer();
  const { data: customers } = useGetAllCustomers();

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c));
  };

  const handleDeleteCustomer = async (customerId: any) => {
    await mutation.mutate(customerId);
  };

  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <main className="flex-1 p-4 pb-0">
        <div className="mb-1 border-gray-200 border-b-[1px] m-6 ">
          <h1 className="text-2xl font-semibold mb-2">Customer</h1>
          <div className="flex justify-between w-full flex-row">
            <p className="text-muted-foreground w-1/2">
              You can manage and organize your customer and other things here
            </p>

            <Tabs defaultValue="account" className="w-[45%] bg-transparent">
              <TabsList className="h-[45px] flex order-1 p-0 rounded-none bg-transparent">
                <TabsTrigger
                  className="w-full bottom-0 rounded-none text-lg font-semibold p-0 m-0 h-full border-[#6366F1] text-[#6366F1] border-b-[2px] bg-transparent outline-none"
                  value="Customer"
                >
                  Customer
                </TabsTrigger>
                <TabsTrigger
                  className="w-full bottom-0 rounded-none text-lg font-semibold p-0 m-0 h-full bg-transparent outline-none"
                  value="Promo"
                >
                  Promo
                </TabsTrigger>
                <TabsTrigger
                  className="w-full bottom-0 rounded-none text-lg font-semibold p-0 m-0 h-full bg-transparent outline-none"
                  value="Voucher"
                >
                  Voucher
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex p-4 pb-0">
          <div className="w-full">
            <div className="rounded-lg bg-[#6366F1] text-white p-4 mb-8">
              <h2 className="text-xl font-semibold mb-2">Customer</h2>
              <p className="opacity-90 mb-8">
                On this menu you will be able to create, edit, and also delete
                <br />
                the customer. Also you can manage it easily.
              </p>

              <div className="flex gap-4 text-white">
                <AddCustomerDialog />
                <div className="flex-1 flex gap-2">
                  <div className="flex-1 relative flex-row justify-between">
                    <Input
                      placeholder="Search Customer"
                      className="w-full bg-white/10 border-0 placeholder:text-white/60 text-white"
                    />
                    {/* <Button
                      variant="secondary"
                      className="bg-white/10 text-primary hover:bg-gray-100"
                    >
                      Search
                    </Button> */}
                  </div>
                  <Button
                    variant="default"
                    className="bg-white/30 backdrop-blur-lg text-white hover:bg-gray-100 hover:text-black"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-white/30 backdrop-blur-lg text-white hover:bg-gray-100 hover:text-black"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Favorite Menu</TableHead>
                    <TableHead>Total Transaction</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers?.map((customer: any) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>{customer.favorite_menu}</TableCell>
                      <TableCell>
                        IDR {formatIDR(Number(customer?.total_transaction))}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <CustomerDetailDialog
                            customerId={customer?.id}
                            onSave={handleSaveCustomer}
                          />
                          <Button variant="ghost" size="icon">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <DeleteConfirmationDialog
                            customerName={customer.name}
                            onConfirm={() => handleDeleteCustomer(customer.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {customers?.length} Data Customers
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-8">
                    1
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8">
                    2
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8">
                    3
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    ...
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8">
                    38
                  </Button>
                  <Button variant="ghost" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <TopMenu />
        </div>
      </main>
    </div>
  );
}
