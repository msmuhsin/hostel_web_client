"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CSVLink, CSVDownload } from "react-csv";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { File, ListFilter } from "lucide-react";
import { getAllAllotedStudents, updateStudentRoom } from "@/lib/functions";
import toast from "react-hot-toast";

const Fields = [
  "Appl No",
  "Admn No",
  "Reg No",
  "Name",
  "Gender",
  "Mob No",
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
];
const studentFields = [
  "applNo",
  "admNo",
  "regNo",
  "name",
  "gender",
  "mobileNo",
  "pincode",
  "distance",
  "caste",
  "quota",
  "income",
  "branch",
  "sem",
  "cgpa",
  "score",
  "allotted",
  "roomNo",
];
const studentEditFields = [
  "applNo",
  "admNo",
  "regNo",
  "name",
  "gender",
  "mobileNo",
  "branch",
  "sem",
  "allotted",
  "roomNo",
];

const fieldLabels = {
  allotted: "Allotted",
  roomNo: "Room No",
  applNo: "Application No",
  admNo: "Admission No",
  regNo: "Registration No",
  name: "Name",
  gender: "Gender",
  mobileNo: "Mobile No",
  branch: "Branch",
  sem: "Semester",
  cgpa: "CGPA",
  score: "Score",
};

export default function RoomAllocationPage() {
  const [exportData, setExportData] = useState({ headers: [], data: [] });

  const [allotmentData, setAllotmentData] = useState({
    MH: {
      S1: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      S3: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      S5: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      S7: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      S9: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      M1: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      M3: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
    },
    LH: {
      S1: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      S3: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      S5: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      S7: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      S9: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      M1: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
      M3: {
        General: [],
        SC: [],
        ST: [],
        PH: [],
        BPL: [],
      },
    },
  });

  const getAllotmentData = async () => {
    const res = await getAllAllotedStudents();
    setAllotmentData(res.data);
  };

  const getExportData = async () => {
    const headers = [
      { label: "Application No", key: "applNo" },
      { label: "Admission No", key: "admNo" },
      { label: "Registration No", key: "regNo" },
      { label: "Name", key: "name" },
      { label: "Gender", key: "gender" },
      { label: "Mobile No", key: "mobileNo" },
      { label: "Pincode", key: "pincode" },
      { label: "Distance", key: "distance" },
      { label: "Caste", key: "caste" },
      { label: "Quota", key: "quota" },
      { label: "Income", key: "income" },
      { label: "Branch", key: "branch" },
      { label: "Semester", key: "sem" },
    ];

    const data = [];

    try {
      // Loop through MH data
      Object.entries(allotmentData.MH).forEach(([semester, categoriesData]) => {
        Object.entries(categoriesData).forEach(([category, students]) => {
          students.forEach((student) => {
            data.push({
              applNo: student.applNo,
              admNo: student.admNo,
              regNo: student.regNo,
              name: student.name,
              gender: student.gender,
              mobileNo: student.mobileNo,
              pincode: student.pincode,
              distance: student.distance,
              caste: student.caste,
              quota: student.quota,
              income: student.income,
              branch: student.branch,
              sem: student.sem,
            });
          });
        });
      });

      Object.entries(allotmentData.LH).forEach(([semester, categoriesData]) => {
        Object.entries(categoriesData).forEach(([category, students]) => {
          students.forEach((student) => {
            data.push({
              applNo: student.applNo,
              admNo: student.admNo,
              regNo: student.regNo,
              name: student.name,
              gender: student.gender,
              mobileNo: student.mobileNo,
              pincode: student.pincode,
              distance: student.distance,
              caste: student.caste,
              quota: student.quota,
              income: student.income,
              branch: student.branch,
              sem: student.sem,
            });
          });
        });
      });

      setExportData({ headers, data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAllotedStudents();
      setAllotmentData(res.data);
    };

    fetchData();
  }, []);

  function EditStudentDialog({ student }) {
    const [studentData, setStudentData] = useState(student);

    const handleSubmit = async () => {
      const data = {
        RoomNo: studentData.roomNo,
      };

      const res = await updateStudentRoom(data, student._id);

      if (res.status == 200 && res.data.success == true) {
        toast.success("Room Updated successfully", {
          position: "top-right",
        });

        await getAllotmentData();
      } else {
        toast.error("Failed to update room", {
          position: "top-right",
        });
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="h-7 gap-1 text-sm">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit student Room No</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 overflow-y-scroll py-2 no-scrollbar w-full pr-1 h-[60vh]">
            {studentEditFields.map((field) => (
              <div className="grid grid-cols-3 items-center gap-4" key={field}>
                <Label htmlFor={field} className="col-span-1">
                  {fieldLabels[field]}
                </Label>
                <Input
                  id={field}
                  type="text"
                  value={
                    field == "allotted"
                      ? studentData[field] == true
                        ? "Yes"
                        : "No"
                      : studentData[field]
                  }
                  className="col-span-2 h-8"
                  readOnly={field == "roomNo" ? false : true}
                  onChange={(e) => {
                    setStudentData({
                      ...studentData,
                      [field]: e.target.value,
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <div className="flex items-center">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={studentData.roomNo == ""}
              >
                {student.roomNo == "" ? "Save" : "Update"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function renderCategoryRows(categoriesData, Fields, studentFields) {
    return Object.entries(categoriesData).map(([category, students]) => (
      <React.Fragment key={category}>
        {students.length > 0 && (
          <React.Fragment>
            <TableRow className="bg-accent w-full text-center">
              <TableCell colSpan={Fields.length + 1} className="text-base">
                {category}
              </TableCell>
            </TableRow>
            {students.map((student) => (
              <TableRow key={student._id}>
                {studentFields.map((field) => (
                  <TableCell
                    key={`${student._id}-${field}`}
                    className={field == "allotted" ? "text-center" : ""}
                  >
                    {field === "allotted"
                      ? student[field] === true
                        ? "Yes"
                        : "No"
                      : field == "roomNo"
                        ? student[field]
                          ? student[field]
                          : "Not Available"
                        : student[field]}
                  </TableCell>
                ))}
                <TableCell>
                  <EditStudentDialog student={student} />
                </TableCell>
              </TableRow>
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    ));
  }

  const hasNonEmptyDataInLH = Object.values(allotmentData.LH).some(
    (categoriesData) =>
      Object.values(categoriesData).some((category) => category.length > 0)
  );

  const hasNonEmptyDataInMH = Object.values(allotmentData.MH).some(
    (categoriesData) =>
      Object.values(categoriesData).some((category) => category.length > 0)
  );

  function StudentListing() {
    return (
      <main>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tabs defaultValue="all" className="gap-y-5 flex-col flex w-[80vw]">
            <div className="flex items-center w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="lh">LH</TabsTrigger>
                <TabsTrigger value="mh">MH</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <CSVLink
                  data={exportData.data}
                  headers={exportData.headers}
                  asyncOnClick={true}
                  onClick={(event, done) =>
                    getExportData().then(() => {
                      done();
                    })
                  }
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </CSVLink>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-05-chunk-3">
                <div className="flex flex-row gap-2">
                  <CardHeader className="px-7">
                    <CardTitle>Student Details</CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="">
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
                      {/* Render MH data */}
                      {allotmentData.MH && hasNonEmptyDataInMH && (
                        <>
                          <TableRow className="bg-accent w-full text-center border-t-8 border-blue-200">
                            <TableCell
                              colSpan={Fields.length + 1}
                              className="font-bold text-base"
                            >
                              MH
                            </TableCell>
                          </TableRow>
                          {Object.entries(allotmentData.MH).map(
                            ([semester, categoriesData]) =>
                              categoriesData &&
                              Object.values(categoriesData).flat().length >
                                0 && (
                                <React.Fragment key={semester}>
                                  <TableRow className="bg-accent w-full text-center border-t-8">
                                    <TableCell
                                      colSpan={Fields.length + 1}
                                      className="font-bold text-base"
                                    >
                                      {semester}
                                    </TableCell>
                                  </TableRow>
                                  {renderCategoryRows(
                                    categoriesData,
                                    Fields,
                                    studentFields
                                  )}
                                </React.Fragment>
                              )
                          )}
                        </>
                      )}

                      {allotmentData.LH && hasNonEmptyDataInLH && (
                        <>
                          <TableRow className="bg-accent w-full text-center border-t-8 border-blue-300">
                            <TableCell
                              colSpan={Fields.length + 1}
                              className="font-bold text-base"
                            >
                              LH
                            </TableCell>
                          </TableRow>
                          {Object.entries(allotmentData.LH).map(
                            ([semester, categoriesData]) =>
                              categoriesData &&
                              Object.values(categoriesData).flat().length >
                                0 && (
                                <React.Fragment key={semester}>
                                  <TableRow className="bg-accent w-full text-center border-t-8">
                                    <TableCell
                                      colSpan={Fields.length + 1}
                                      className="font-bold text-base"
                                    >
                                      {semester}
                                    </TableCell>
                                  </TableRow>
                                  {renderCategoryRows(
                                    categoriesData,
                                    Fields,
                                    studentFields
                                  )}
                                </React.Fragment>
                              )
                          )}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mh">
              <Card x-chunk="dashboard-05-chunk-3">
                <div className="flex flex-row gap-2">
                  <CardHeader className="px-7">
                    <CardTitle>Student Details</CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="">
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
                      {/* Render MH data */}
                      {allotmentData.MH && hasNonEmptyDataInMH ? (
                        <>
                          {Object.entries(allotmentData.MH).map(
                            ([semester, categoriesData]) =>
                              categoriesData &&
                              Object.values(categoriesData).flat().length >
                                0 && (
                                <React.Fragment key={semester}>
                                  <TableRow className="bg-accent w-full text-center border-t-8">
                                    <TableCell
                                      colSpan={Fields.length + 1}
                                      className="font-bold text-base"
                                    >
                                      {semester}
                                    </TableCell>
                                  </TableRow>
                                  {renderCategoryRows(
                                    categoriesData,
                                    Fields,
                                    studentFields
                                  )}
                                </React.Fragment>
                              )
                          )}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={Fields.length + 1}
                            className="text-center"
                          >
                            No data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="lh">
              <Card x-chunk="dashboard-05-chunk-3">
                <div className="flex flex-row gap-2">
                  <CardHeader className="px-7">
                    <CardTitle>Student Details</CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="">
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
                      {allotmentData.LH && hasNonEmptyDataInLH ? (
                        <>
                          {Object.entries(allotmentData.LH).map(
                            ([semester, categoriesData]) =>
                              categoriesData &&
                              Object.values(categoriesData).flat().length >
                                0 && (
                                <React.Fragment key={semester}>
                                  <TableRow className="bg-accent w-full text-center border-t-8">
                                    <TableCell
                                      colSpan={Fields.length + 1}
                                      className="font-bold text-base"
                                    >
                                      {semester}
                                    </TableCell>
                                  </TableRow>
                                  {renderCategoryRows(
                                    categoriesData,
                                    Fields,
                                    studentFields
                                  )}
                                </React.Fragment>
                              )
                          )}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={Fields.length + 1}
                            className="text-center"
                          >
                            No data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
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
