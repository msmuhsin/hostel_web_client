"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getAllAllotedStudents } from "@/lib/functions";

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

export default function RoomAllocationPage() {
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAllotedStudents();
      console.log(res.data);
      setAllotmentData(res.data);
    };

    fetchData();
  }, []);

  function EditStudentDialog({ student }) {
    const [studentData, setStudentData] = useState(student);

    const handleSubmit = async () => {
      alert(studentData);
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
                  {field}
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
            <div>{studentData.roomNo}</div>
            <div className="flex items-center">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={studentData.roomNo == ""}
              >
                {studentData.roomNo == "" ? "Save" : "Update"}
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
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
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
