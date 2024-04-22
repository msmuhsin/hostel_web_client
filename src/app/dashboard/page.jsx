"use client";

import { useEffect, useState } from "react";
import { getAllStudents } from "@/lib/functions";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { File, ListFilter } from "lucide-react";

export default function Dashboard() {
  const semesters = ["All", "S1", "S3", "S5", "S7", "M1 & M2"];
  const Fileds = [
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
    "Room No",
  ];

  const [selectedSemester, setSelectedSemester] = useState("All");
  const [allStudentData, setAllStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllStudents();
      console.log(res.data.allStudents);
      setAllStudentData(res.data.allStudents);
      console.log(allStudentData);
    };

    fetchData();
  }, []);

  function StudentListing() {
    return (
      <div className="gap-y-5 flex-col flex w-[80vw] ">
        <div className="flex items-center w-full">
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
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Student Details</CardTitle>
          </CardHeader>
          <CardContent className="">
            <Table>
              <TableHeader>
                <TableRow>
                  {Fileds.map((field) => (
                    <TableCell key={field} className="text-nowrap">
                      {field}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allStudentData.map((student, index) => (
                  <TableRow key={index} className="bg-accent">
                    <TableCell>{"12341234"}</TableCell>
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
                    <TableCell>{"24"}</TableCell>
                    <TableCell>{"234"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
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
