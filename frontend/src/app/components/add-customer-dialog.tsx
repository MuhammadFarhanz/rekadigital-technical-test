"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useAddCustomer } from "@/lib/hooks/useAddCustomer";

const validationSchema = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  level: Yup.string().required("Level is required"),
  favorite_menu: Yup.string().required("Favorite menu is required"),
  address: Yup.string().required("Address is required"),
});

export function AddCustomerDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isSuccess, isPending } = useAddCustomer();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      level: "Warga",
      favorite_menu: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      mutate(values, {
        onSuccess: () => {
          setOpen(false);
          resetForm();
        },
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-white/20 text-white  hover:bg-gray-100 hover:text-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Customer name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter customer name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="customer@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1234567890"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Level</Label>
              <Select
                name="level"
                value={formik.values.level}
                onValueChange={(value) => formik.setFieldValue("level", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Warga">Warga</SelectItem>
                  <SelectItem value="Juragan">Juragan</SelectItem>
                  <SelectItem value="Sultan">Sultan</SelectItem>
                  <SelectItem value="Konglomerat">Konglomerat</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.level && formik.errors.level ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.level}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label>Favorite Menu</Label>
              <Select
                name="favorite_menu"
                value={formik.values.favorite_menu}
                onValueChange={(value) =>
                  formik.setFieldValue("favorite_menu", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select menu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chicken-combo">
                    Chicken & Ribs Combo
                  </SelectItem>
                  <SelectItem value="surf-turf">
                    Surf & Turf Gift Basket
                  </SelectItem>
                  <SelectItem value="fried-chicken">
                    Fried Chicken Dinner
                  </SelectItem>
                  <SelectItem value="bbq-rib">BBQ Rib Dinner</SelectItem>
                  <SelectItem value="dark-stormy">Dark & Stormy</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.favorite_menu && formik.errors.favorite_menu ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.favorite_menu}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter customer address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address}
              </div>
            ) : null}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Customer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
