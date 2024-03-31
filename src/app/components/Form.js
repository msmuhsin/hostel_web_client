import React from "react";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useFormik } from "formik";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Applicationform = () => {
  const CalendarIcon = ({ className }) => (
    <svg
      width="15"
      height="15"
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const DropDownArrow = ({ className }) => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const formik = useFormik({
    initialValues: {
      Admno: "",
      Regno: "",
      Name: "",
      Gender: "",
      DOB: "",
      Mobile: "",
      Email: "",
      PermanentAddress: "",
      PresentAddress: "",
      PinCode: "",
      Distance: "",
      Caste: "",
      Quota: "",
      Income: "",
      Branch: "",
      Sem: "",
      CGPA: "",
    },
    validationSchema: Yup.object({
      Admno: Yup.string().required("Admission Number is required"),
      Regno: Yup.string().required("Registration Number is required"),
      Name: Yup.string().required("Name is required"),
      Gender: Yup.string().required("Gender is required"),
      DOB: Yup.string().required("Date of Birth is required"),
      Mobile: Yup.string()
        .required("Mobile Number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid Mobile Number"),
      Email: Yup.string().required("Email is required").email("Invalid Email"),
      PermanentAddress: Yup.string().required("Permanent Address is required"),
      PresentAddress: Yup.string().required("Present Address is required"),
      PinCode: Yup.string()
        .required("Pincode is required")
        .matches(/^[1-9][0-9]{5}$/, "Invalid Pincode"),
      Distance: Yup.string().required("Distance is required"),
      Caste: Yup.string().required("Caste is required"),
      Quota: Yup.string().required("Quota is required"),
      Income: Yup.string().required("Income is required"),
      Branch: Yup.string().required("Branch is required"),
      Sem: Yup.string().required("Semester is required"),
      CGPA: Yup.string().required("CGPA is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  return (
    <form
      className="bg-white w-full md:w-1/2 rounded-md px-8 py-10 shadow-md flex flex-col space-y-4"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center mb-4">
        Student Application Form
      </h2>
      <div className="flex flex-col space-y-1">
        <label htmlFor="Admno" className="text-sm font-medium">
          Admission No
        </label>
        <Input
          type="text"
          name="Admno"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Admission Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Admno}
        />

        {formik.touched.Admno && formik.errors.Admno && (
          <div className="text-red-500 text-xs">{formik.errors.Admno}</div>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="Regno" className="text-sm font-medium">
          Registration No
        </label>
        <Input
          type="text"
          name="Regno"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Registration Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Regno}
        />
        {formik.touched.Regno && formik.errors.Regno && (
          <div className="text-red-500 text-xs">{formik.errors.Regno}</div>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="Name" className="text-sm font-medium">
          Name
        </label>
        <Input
          type="text"
          name="Name"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Name}
        />
        {formik.touched.Name && formik.errors.Name && (
          <div className="text-red-500 text-xs">{formik.errors.Name}</div>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="Gender" className="text-sm font-medium">
          Gender
        </label>
        <div
          role="group"
          aria-labelledby="my-radio-group"
          className="flex items-center space-x-2"
        >
          <label className="text-sm">
            <input
              type="radio"
              name="Gender"
              value="male"
              className="mr-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.Gender === "male"}
            />
            Male
          </label>
          <label className="text-sm">
            <input
              type="radio"
              name="Gender"
              value="female"
              className="mr-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.Gender === "female"}
            />
            Female
          </label>
          <label className="text-sm">
            <input
              type="radio"
              name="Gender"
              value="other"
              className="mr-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.Gender === "other"}
            />
            Other
          </label>
        </div>
        {formik.touched && formik.errors && (
          <div className="text-red-500 text-xs">{formik.errors.Gender}</div>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="DOB" className="text-sm font-medium">
          Date of Birth
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ",
                formik.values.DOB ? "text-black" : "text-gray-500"
              )}
            >
              {formik.values.DOB ? (
                format(new Date(formik.values.DOB), "dd/MM/yyyy")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formik.values.DOB ? new Date(formik.values.DOB) : null}
              onSelect={(date) => {
                formik.setFieldValue("DOB", date.toISOString());
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              defaultMonth={new Date(2000, 1)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {formik.touched.DOB &&
          formik.errors.DOB && ( //?
            <div className="text-red-500 text-xs">{formik.errors.DOB}</div>
          )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="Mobile" className="text-sm font-medium">
          Mobile Number
        </label>
        <Input
          type="number"
          name="Mobile"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Mobile Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Mobile}
        />
        {formik.touched.Mobile && formik.errors.Mobile && (
          <div className="text-red-500 text-xs">{formik.errors.Mobile}</div>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address
        </label>
        <Input
          type="email"
          name="Email"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          placeholder="Enter Email Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Email}
        />
        {formik.touched.Email && formik.errors.Email && (
          <div className="text-red-500 text-xs">{formik.errors.Email}</div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="PermanentAddress" className="text-sm font-medium">
          Permanent Address
        </label>
        <Input
          type="text"
          name="PermanentAddress"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Permanent Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.PermanentAddress}
        />
        {formik.touched.PermanentAddress && formik.errors.PermanentAddress && (
          <div className="text-red-500 text-xs">
            {formik.errors.PermanentAddress}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="PresentAddress" className="text-sm font-medium">
          Present Address
        </label>
        <Input
          type="text"
          name="PresentAddress"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Present Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.PresentAddress}
        />
        {formik.touched.PresentAddress && formik.errors.PresentAddress && (
          <div className="text-red-500 text-xs">
            {formik.errors.PresentAddress}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="PinCode" className="text-sm font-medium">
          Pincode
        </label>
        <Input
          type="number"
          name="PinCode"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Pincode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.PinCode}
        />
        {formik.touched.PinCode && formik.errors.PinCode && (
          <div className="text-red-500 text-xs">{formik.errors.PinCode}</div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="Distance" className="text-sm font-medium">
          Distance from College
        </label>
        <Input
          type="number"
          name="Distance"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Distance from College"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Distance}
        />
        {formik.touched.Distance && formik.errors.Distance && (
          <div className="text-red-500 text-xs">{formik.errors.Distance}</div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="Caste" className="text-sm font-medium">
          Caste
        </label>
        <DropdownMenu align="left" className="relative h-4">
          <DropdownMenuTrigger className="text-sm text-left w-max outline-none border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ">
            {formik.values.Caste ? formik.values.Caste : "Select Caste"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => formik.setFieldValue("Caste", "General")}
            >
              General
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => formik.setFieldValue("Caste", "OBC")}
            >
              OBC
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => formik.setFieldValue("Caste", "SC")}
            >
              SC
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => formik.setFieldValue("Caste", "ST")}
            >
              ST
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {formik.touched.Caste && formik.errors.Caste && (
          <div className="text-red-500 text-xs">{formik.errors.Caste}</div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="Quota" className="text-sm font-medium">
          Quota
        </label>
        <Input
          type="text"
          name="Quota"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Quota"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Quota}
        />
        {formik.touched.Quota && formik.errors.Quota && (
          <div className="text-red-500 text-xs">{formik.errors.Quota}</div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="Income" className="text-sm font-medium">
          Annual Income
        </label>
        <Input
          type="number"
          name="Income"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Annual Income"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Income}
        />
        {formik.touched.Income && formik.errors.Income && (
          <div className="text-red-500 text-xs">{formik.errors.Income}</div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="Branch" className="text-sm font-medium">
          Branch
        </label>
        <Input
          type="text"
          name="Branch"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Branch"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Branch}
        />
        {formik.touched.Branch && formik.errors.Branch && (
          <div className="text-red-500 text-xs">{formik.errors.Branch}</div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="Sem" className="text-sm font-medium">
          Semester
        </label>
        <Input
          type="text"
          name="Sem"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Semester"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Sem}
        />
        {formik.touched.Sem && formik.errors.Sem && (
          <div className="text-red-500 text-xs">{formik.errors.Sem}</div>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="CGPA" className="text-sm font-medium">
          CGPA
        </label>
        <Input
          type="number"
          name="CGPA"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter CGPA"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.CGPA}
        />
        {formik.touched.CGPA && formik.errors.CGPA && (
          <div className="text-red-500 text-xs">{formik.errors.CGPA}</div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className={`bg-blue-500 text-white font-semibold px-4 w-full py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            formik.isSubmitting ? "disabled opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Applicationform;
