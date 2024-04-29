"use client";

import { useEffect, useState } from "react";
import { getAllStudents, updateStudentData } from "@/lib/functions";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TabsList } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { File, ListFilter } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Fields = [
  "Appl No",
  "Admn No",
  "Reg No",
  "Name",
  "Gender",
  "DOB",
  "Mob No",
  "Email",
  "Permanent Address",
  "Present Address",
  "Pincode",
  "Distance",
  "Caste",
  "Quota",
  "Income",
  "Branch",
  "Semester",
  "CGPA",
  "Score",
  "Allotted",
  "Room No",
  "",
];

const StudentFieldName = [
  "applNo",
  "admNo",
  "regNo",
  "name",
  "gender",
  "dob",
  "mobileNo",
  "email",
  "permanentAddress",
  "presentAddress",
  "pincode",
  "distance",
  "caste",
  "quota",
  "income",
  "branch",
  "sem",
  "cgpa",
];

const formikFields = [
  "RegNo",
  "Name",
  "Gender",
  "DOB",
  "Mobile",
  "Email",
  "PermanentAddress",
  "PresentAddress",
  "PinCode",
  "Distance",
  "Caste",
  "Quota",
  "Income",
  "Branch",
  "Sem",
  "CGPA",
];

const validationSchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  Gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"]),
  DOB: Yup.string()
    .required("Date of Birth is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid Date"),
  Mobile: Yup.number()
    .required("Mobile Number is required")
    .min(1000000000, "Invalid Mobile Number"),
  Email: Yup.string().required("Email is required").email("Invalid Email"),
  PermanentAddress: Yup.string().required("Permanent Address is required"),
  PresentAddress: Yup.string().required("Present Address is required"),
  PinCode: Yup.string()
    .required("Pincode is required")
    .min(6)
    .max(6)
    .length(6)
    .matches(/^[0-9]+$/, "Invalid Pincode"),
  Distance: Yup.number().required("Distance is required").min(0).max(3000),
  Caste: Yup.string().required("Caste is required"),
  Quota: Yup.string().required("Quota is required"),
  // cannot be negative
  Income: Yup.string().required("Income is required").min(0),
  Branch: Yup.string()
    .oneOf([
      "MECHANICAL ENGINEERING",
      "CIVIL ENGINEERING",
      "BACHELOR OF ARCHITECTURE",
      "COMPUTER SCIENCE ENGINEERING",
      "ELECTRICAL AND ELECTRONICS ENGINEERING",
      "ELECTRONICS AND COMMUNICATION ENGINEERING",
      "PRODUCTION ENGINEERING",
      "CHEMICAL ENGINEERING",
    ])
    .required("Branch is required"),
  Sem: Yup.string()
    .oneOf(["S1", "S3", "S5", "S7", "S9", "M1", "M2"])
    .required("Semester is required"),
  // cannot be negative
  CGPA: Yup.number().required("CGPA is required").min(1).max(10),
});

export function EditStudentDialog({
  student,
  setAllStudentData,
  setHighlightedRow,
}) {
  const [studentData, setStudentData] = useState(student);

  const formik = useFormik({
    initialValues: {
      RegNo: student.regNo,
      Name: student.name,
      Gender: student.gender,
      DOB: student.dob,
      Mobile: student.mobileNo,
      Email: student.email,
      PermanentAddress: student.permanentAddress,
      PresentAddress: student.presentAddress,
      PinCode: student.pincode,
      Distance: student.distance,
      Caste: student.caste,
      Quota: student.quota,
      Income: student.income,
      Branch: student.branch,
      Sem: student.sem,
      CGPA: student.cgpa,
    },

    validationSchema: validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await updateStudentData(values, student._id);
        if (res.status === 200 && res.data.success) {
          toast.success("Student data updated successfully", {
            position: "top-right",
          });
          const updatedData = await getAllStudents();
          setAllStudentData(updatedData.data.allStudents);
          setHighlightedRow(student._id);
          setTimeout(() => {
            setHighlightedRow(null);
          }, 3000);
        } else {
          toast.error("Error updating student data", { position: "top-right" });
        }
      } catch (error) {
        console.error(error);
        toast.error("Error updating student data", { position: "top-right" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1 text-sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit student Data</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 overflow-y-scroll py-2 no-scrollbar w-full pr-1 h-[70vh]">
          {Fields.slice(0, Fields.length - 4).map((field, index) => (
            <div className="grid grid-cols-3 items-center gap-4" key={field}>
              <Label htmlFor={field} className="col-span-1">
                {field}
              </Label>
              <Input
                id={field}
                type="text"
                value={studentData[StudentFieldName[index]]}
                disabled={field === "Appl No" || field === "Admn No"}
                className="col-span-2 h-8"
                onChange={(e) => {
                  setStudentData({
                    ...studentData,
                    [StudentFieldName[index]]: e.target.value,
                  });
                  formik.setFieldValue(formikFields[index - 2], e.target.value);
                }}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <div className="flex justify-between items-center gap-4">
            <div className="justify-start flex ">
              {formik.errors && (
                <div className="text-red-500 text-sm text-left w-full">
                  {Object.keys(formik.errors).map((key) => (
                    <p key={key}>* {formik.errors[key]}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <Button
                type="submit"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Save changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StudentTable({
  studentData,
  setAllStudentData,
  setHighlightedRow,
  highlightedRow,
}) {
  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            {Fields.map((field) => (
              <TableCell key={field} className="text-nowrap">
                {field}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentData.map((student) => (
            <TableRow
              key={student._id}
              className={
                "bg-accent" +
                (student._id === highlightedRow
                  ? " bg-green-200/40 transition ease-in-out delay-150"
                  : "")
              }
            >
              <TableCell>{student.applNo}</TableCell>
              <TableCell>{student.admNo}</TableCell>
              <TableCell>{student.regNo}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.dob}</TableCell>
              <TableCell>{student.mobileNo}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.permanentAddress}</TableCell>
              <TableCell>{student.presentAddress}</TableCell>
              <TableCell>{student.pincode}</TableCell>
              <TableCell>{student.distance}</TableCell>
              <TableCell>{student.caste}</TableCell>
              <TableCell>{student.quota}</TableCell>
              <TableCell>{student.income}</TableCell>
              <TableCell>{student.branch}</TableCell>
              <TableCell>{student.sem}</TableCell>
              <TableCell>{student.cgpa}</TableCell>
              <TableCell>{student.score}</TableCell>
              <TableCell>{student.allotted ? "Yes" : "No"}</TableCell>
              <TableCell>
                {student.roomNo ? student.roomNo : "Not Available"}
              </TableCell>
              <TableCell>
                <EditStudentDialog
                  student={student}
                  setAllStudentData={setAllStudentData}
                  setHighlightedRow={setHighlightedRow}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
}

export default function Dashboard() {
  const semesters = ["All", "S1", "S3", "S5", "S7", "S9", "M1 & M2"];

  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [allStudentData, setAllStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedRow, setHighlightedRow] = useState(null);

  const tableData = {
    all: filteredStudentData,
    lh: filteredStudentData.filter((student) => student.gender === "Female"),
    mh: filteredStudentData.filter((student) => student.gender === "Male"),
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllStudents();
      setAllStudentData(res.data.allStudents);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSemester === "All") {
      setFilteredStudentData(
        allStudentData.filter((student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      const filteredData = allStudentData.filter(
        (student) =>
          student.sem === selectedSemester &&
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudentData(filteredData);
    }
  }, [selectedSemester, allStudentData, setAllStudentData]);

  const exportToExcel = () => {
    try {
      let worksheet = null;

      if (selectedTab === "all") {
        worksheet = XLSX.utils.json_to_sheet(filteredStudentData);
      } else if (selectedTab === "lh") {
        const lhData = filteredStudentData.filter(
          (student) => student.gender === "Female"
        );
        worksheet = XLSX.utils.json_to_sheet(lhData);
      } else if (selectedTab === "mh") {
        const mhData = filteredStudentData.filter(
          (student) => student.gender === "Male"
        );
        worksheet = XLSX.utils.json_to_sheet(mhData);
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      saveAs(blob, "data.xlsx");

      toast.success("Data exported successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to export data", {
        position: "top-right",
      });
    }
  };

  function StudentListing() {
    return (
      <Tabs
        value={selectedTab}
        className="gap-y-5 flex-col flex w-[80vw]"
        onValueChange={(val) => {
          setSelectedTab(val);
        }}
      >
        <div className="flex items-center w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="lh">LH</TabsTrigger>
            <TabsTrigger value="mh">MH</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {semesters.map((semester) => (
                  <DropdownMenuCheckboxItem
                    key={semester}
                    checked={semester === selectedSemester}
                    onCheckedChange={() => setSelectedSemester(semester)}
                  >
                    {semester}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-sm"
              onClick={exportToExcel}
            >
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-05-chunk-3">
            <div className="flex flex-row gap-2">
              <CardHeader className="px-7">
                <CardTitle>Student Details</CardTitle>
              </CardHeader>
              {/* <form className="ml-auto mr-7 flex-1 sm:flex-initial items-center justify-center flex">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form> */}
            </div>
            <StudentTable
              {...{
                studentData: tableData.all,
                setAllStudentData,
                setHighlightedRow,
                highlightedRow,
              }}
            />
          </Card>
        </TabsContent>
        <TabsContent value="mh">
          <Card x-chunk="dashboard-05-chunk-3">
            <div className="flex flex-row gap-2">
              <CardHeader className="px-7">
                <CardTitle>Student Details</CardTitle>
              </CardHeader>
            </div>
            <StudentTable
              {...{
                studentData: tableData.mh,
                setAllStudentData,
                setHighlightedRow,
                highlightedRow,
              }}
            />
          </Card>
        </TabsContent>
        <TabsContent value="lh">
          <Card x-chunk="dashboard-05-chunk-3">
            <div className="flex flex-row gap-2">
              <CardHeader className="px-7">
                <CardTitle>Student Details</CardTitle>
              </CardHeader>
            </div>
            <StudentTable
              {...{
                studentData: tableData.lh,
                setAllStudentData,
                setHighlightedRow,
                highlightedRow,
              }}
            />
          </Card>
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StudentListing />
      </div>
    </main>
  );
}
