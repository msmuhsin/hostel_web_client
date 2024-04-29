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
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { File } from "lucide-react";
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
  const [selectedTab, setSelectedTab] = useState("all");

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
    if (res.data.success == true && res.status == 200) {
      setAllotmentData(res.data.allotmentData);
    } else {
      toast.error("Failed to fetch data", {
        position: "top-right",
      });
    }
  };

  const exportToExcel = () => {
    try {
      const studentsData = [];

      Object.entries(allotmentData.MH).forEach(([semester, categoriesData]) => {
        Object.entries(categoriesData).forEach(([category, students]) => {
          students.forEach((student) => {
            studentsData.push({
              "Application No": student.applNo,
              "Admission No": student.admNo,
              "Registration No": student.regNo,
              Name: student.name,
              Gender: student.gender,
              "Mobile No": student.mobileNo,
              Pincode: student.pincode,
              Distance: student.distance,
              Caste: student.caste,
              Quota: student.quota,
              Income: student.income,
              Branch: student.branch,
              Semester: student.sem,
              "Room No":
                student.roomNo != "" ? student.roomNo : "Not Available",
            });
          });
        });
      });

      Object.entries(allotmentData.LH).forEach(([semester, categoriesData]) => {
        Object.entries(categoriesData).forEach(([category, students]) => {
          students.forEach((student) => {
            studentsData.push({
              "Application No": student.applNo,
              "Admission No": student.admNo,
              "Registration No": student.regNo,
              Name: student.name,
              Gender: student.gender,
              "Mobile No": student.mobileNo,
              Pincode: student.pincode,
              Distance: student.distance,
              Caste: student.caste,
              Quota: student.quota,
              Income: student.income,
              Branch: student.branch,
              Semester: student.sem,
              "Room No":
                student.roomNo != "" ? student.roomNo : "Not Available",
            });
          });
        });
      });

      let worksheet = null;

      if (selectedTab === "all") {
        worksheet = XLSX.utils.json_to_sheet(studentsData);
      } else if (selectedTab === "lh") {
        const lhData = studentsData.filter(
          (student) => student.Gender === "Female"
        );
        worksheet = XLSX.utils.json_to_sheet(lhData);
      } else if (selectedTab === "mh") {
        const mhData = studentsData.filter(
          (student) => student.Gender === "Male"
        );
        worksheet = XLSX.utils.json_to_sheet(mhData);
      } else if (selectedTab === "room-allotted") {
        const roomAllottedData = studentsData.filter(
          (student) => student["Room No"] !== "Not Available"
        );
        worksheet = XLSX.utils.json_to_sheet(roomAllottedData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAllotedStudents();
        if (res.status === 200 && res.data.success === true) {
          setAllotmentData(res.data.allotmentData);
          toast.success("Data fetched successfully", {
            position: "top-right",
          });
        } else {
          toast.error("Failed to fetch data", {
            position: "top-right",
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Resource not found", {
            position: "top-right",
          });
        } else {
          toast.error("An error occurred while fetching data", {
            position: "top-right",
          });
        }
      }
    };

    fetchData();
  }, []);

  function EditStudentDialog({ student }) {
    const [studentData, setStudentData] = useState(student);

    const handleSubmit = async () => {
      try {
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
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Resource not found", {
            position: "top-right",
          });
        } else {
          toast.error("An error occurred while updating room", {
            position: "top-right",
          });
        }
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
            {selectedTab === "room-allotted" &&
            students.filter((student) => student.roomNo !== "").length > 0 ? (
              <TableRow className="bg-accent w-full text-center">
                <TableCell colSpan={Fields.length + 1} className="text-base">
                  {category}
                </TableCell>
              </TableRow>
            ) : null}

            {selectedTab != "room-allotted" && (
              <TableRow className="bg-accent w-full text-center">
                <TableCell colSpan={Fields.length + 1} className="text-base">
                  {category}
                </TableCell>
              </TableRow>
            )}

            {selectedTab === "room-allotted" ? (
              <>
                {students
                  .filter((student) => student.roomNo !== "")
                  .map((student) => (
                    <TableRow key={student._id}>
                      {studentFields.map((field) => (
                        <TableCell
                          key={`${student._id}-${field}`}
                          className={field === "allotted" ? "text-center" : ""}
                        >
                          {field === "allotted"
                            ? student[field] === true
                              ? "Yes"
                              : "No"
                            : field === "roomNo"
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
              </>
            ) : (
              <>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    {studentFields.map((field) => (
                      <TableCell
                        key={`${student._id}-${field}`}
                        className={field === "allotted" ? "text-center" : ""}
                      >
                        {field === "allotted"
                          ? student[field] === true
                            ? "Yes"
                            : "No"
                          : field === "roomNo"
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
              </>
            )}
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

  const hasNonEmptyDataMH_InForRoomAllotted_ForSomeSemester = () => {
    return Object.values(allotmentData.MH).some((semestersData) => {
      return Object.values(semestersData).some((category) => {
        for (const student of category) {
          if (student.roomNo != "") {
            return true;
          }
        }
      });
    });
  };
  const hasNonEmptyDataLH_InForRoomAllotted_ForSomeSemester = () => {
    return Object.values(allotmentData.LH).some((semestersData) => {
      return Object.values(semestersData).some((category) => {
        for (const student of category) {
          if (student.roomNo != "") {
            return true;
          }
        }
      });
    });
  };

  const hasNonEmptyDataInLHSemester = (semester) => {
    return Object.values(allotmentData.LH[semester]).some((category) => {
      for (const student of category) {
        if (student.roomNo != "") {
          return true;
        }
      }
    });
  };

  const hasNonEmptyDataInMHSemester = (semester) => {
    return Object.values(allotmentData.MH[semester]).some((category) => {
      for (const student of category) {
        if (student.roomNo != "") {
          return true;
        }
      }
    });
  };

  function StudentListing() {
    return (
      <main>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tabs
            className="gap-y-5 flex-col flex w-[80vw]"
            onValueChange={(value) => {
              setSelectedTab(value);
            }}
            value={selectedTab}
          >
            <div className="flex items-center w-full">
              <TabsList>
                <TabsTrigger value="all" className =" text-xl" >All</TabsTrigger>
                <TabsTrigger value="lh"  className =" text-xl" >LH</TabsTrigger>
                <TabsTrigger value="mh"  className =" text-xl" >MH</TabsTrigger>
                <TabsTrigger value="room-allotted"  className =" text-xl" >Room Allotted</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
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

                      {!hasNonEmptyDataInLH && !hasNonEmptyDataInMH && (
                        <TableRow>
                          <TableCell
                            colSpan={Fields.length + 1}
                            className="text-center"
                          >
                            No data available
                          </TableCell>
                        </TableRow>
                      )}

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
                                  {selectedTab == "room-allotted" ? (
                                    <TableRow className="bg-accent w-full text-center border-t-8">
                                      <TableCell
                                        colSpan={Fields.length + 1}
                                        className="font-bold text-base"
                                      >
                                        {semester}
                                      </TableCell>
                                    </TableRow>
                                  ) : (
                                    <TableRow className="bg-accent w-full text-center border-t-8">
                                      <TableCell
                                        colSpan={Fields.length + 1}
                                        className="font-bold text-base"
                                      >
                                        {semester}
                                      </TableCell>
                                    </TableRow>
                                  )}

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
            <TabsContent value="room-allotted">
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
                      {selectedTab == "room-allotted" &&
                        !hasNonEmptyDataLH_InForRoomAllotted_ForSomeSemester() &&
                        !hasNonEmptyDataMH_InForRoomAllotted_ForSomeSemester() && (
                          <TableRow className=" w-full text-center">
                            <TableCell colSpan={Fields.length + 1} className="">
                              No data available
                            </TableCell>
                          </TableRow>
                        )}

                      {allotmentData.MH && hasNonEmptyDataInMH && (
                        <>
                          {selectedTab == "room-allotted" &&
                            hasNonEmptyDataInMH &&
                            hasNonEmptyDataMH_InForRoomAllotted_ForSomeSemester() && (
                              <TableRow className="bg-accent w-full text-center border-t-8 border-blue-200">
                                <TableCell
                                  colSpan={Fields.length + 1}
                                  className="font-bold text-base"
                                >
                                  MH
                                </TableCell>
                              </TableRow>
                            )}
                          {Object.entries(allotmentData.MH).map(
                            ([semester, categoriesData]) =>
                              categoriesData &&
                              Object.values(categoriesData).flat().length >
                                0 && (
                                <React.Fragment key={semester}>
                                  {selectedTab == "room-allotted" &&
                                  hasNonEmptyDataInMHSemester(semester) ? (
                                    <TableRow className="bg-accent w-full text-center border-t-8">
                                      <TableCell
                                        colSpan={Fields.length + 1}
                                        className="font-bold text-base"
                                      >
                                        {semester}
                                      </TableCell>
                                    </TableRow>
                                  ) : null}

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
                          {selectedTab == "room-allotted" &&
                            hasNonEmptyDataInLH &&
                            hasNonEmptyDataLH_InForRoomAllotted_ForSomeSemester() && (
                              <TableRow className="bg-accent w-full text-center border-t-8 border-blue-200">
                                <TableCell
                                  colSpan={Fields.length + 1}
                                  className="font-bold text-base"
                                >
                                  LH
                                </TableCell>
                              </TableRow>
                            )}
                          {Object.entries(allotmentData.LH).map(
                            ([semester, categoriesData]) =>
                              categoriesData &&
                              Object.values(categoriesData).flat().length >
                                0 && (
                                <React.Fragment key={semester}>
                                  {selectedTab == "room-allotted" &&
                                  hasNonEmptyDataInLHSemester(semester) ? (
                                    <TableRow className="bg-accent w-full text-center border-t-8">
                                      <TableCell
                                        colSpan={Fields.length + 1}
                                        className="font-bold text-base"
                                      >
                                        {semester}
                                      </TableCell>
                                    </TableRow>
                                  ) : null}

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
