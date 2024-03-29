import React from "react";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";

const Applicationform = () => {
  const formik = useFormik({
    initialValues: {
      Admno: "",
      Regno: "",
      Name: "",
      Gender: "",
      DOB: "",
      Mobile: "",
      Email: "",
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
          <label>
            <Input type="radio" name="Gender" value="male" className="mr-1" />
            Male
          </label>
          <label>
            <Input type="radio" name="Gender" value="female" className="mr-1" />
            Female
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
        <Input
          type="text"
          name="DOB"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Date of Birth (DD-MM-YYYY)"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.DOB}
        />
        {formik.touched.DOB && formik.errors.DOB && (
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

      {/*
          <div className="flex flex-col space-y-1">
            <label htmlFor="PermanentAddress" className="text-sm font-medium">
              Permanent Address
            </label>
            <Input
              type="text"
              name="PermanentAddress"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Permanent Address"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.PermanentAddress && errors.PermanentAddress && (
              <ErrorMessage
                name="PermanentAddress"
                component="div"
                className="text-red-500 text-xs"
              />
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.PresentAddress && errors.PresentAddress && (
              <ErrorMessage
                name="PresentAddress"
                component="div"
                className="text-red-500 text-xs"
              />
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.PinCode && errors.PinCode && (
              <ErrorMessage
                name="PinCode"
                component="div"
                className="text-red-500 text-xs"
              />
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.Distance && errors.Distance && (
              <ErrorMessage
                name="Distance"
                component="div"
                className="text-red-500 text-xs"
              />
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="Caste" className="text-sm font-medium">
              Caste
            </label>
            <Input
              type="text"
              name="Caste"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Caste"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.Caste && errors.Caste && (
              <ErrorMessage
                name="Caste"
                component="div"
                className="text-red-500 text-xs"
              />
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
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.Quota && errors.Quota && (
              <ErrorMessage
                name="Quota"
                component="div"
                className="text-red-500 text-xs"
              />
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.Income && errors.Income && (
              <ErrorMessage
                name="Income"
                component="div"
                className="text-red-500 text-xs"
              />
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.Branch && errors.Branch && (
              <ErrorMessage
                name="Branch"
                component="div"
                className="text-red-500 text-xs"
              />
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.Sem && errors.Sem && (
              <ErrorMessage
                name="Sem"
                component="div"
                className="text-red-500 text-xs"
              />
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.CGPA && errors.CGPA && (
              <ErrorMessage
                name="CGPA"
                component="div"
                className="text-red-500 text-xs"
              />
            )}
          </div> */}

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
