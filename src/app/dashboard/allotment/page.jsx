"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { createAllotmentData } from "@/lib/functions";
import { RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAllotmentContext } from "@/app/context/AllotmentContext.js";

const Allotmentpage = () => {
  const quota = ["SC/ST/PH/BPL", "S1", "S3", "S5", "S7", "PG"];
  const { setAllotmentSetId } = useAllotmentContext();
  const [isLoading, setIsLoading] = useState(false);
  const [vacancy, setVacancy] = useState({
    MH: 0,
    LH: 0,
  });
  const [vacancyDisplay, setVacancyDisplay] = useState({
    MH: "0",
    LH: "0",
  });
  const [seatsDisplay, setSeatsDisplay] = useState({
    LH: Object.fromEntries(quota.map((item) => [item, "0"])),
    MH: Object.fromEntries(quota.map((item) => [item, "0"])),
  });
  const [seats, setSeats] = useState({
    MH: Object.fromEntries(
      quota.map((item) => [item, { value: 0, percentage: 0 }])
    ),
    LH: Object.fromEntries(
      quota.map((item) => [item, { value: 0, percentage: 0 }])
    ),
  });
  const [availableSeats, setAvailableSeats] = useState({
    MH: 0,
    LH: 0,
  });

  const handleSubmit = async () => {
    const data = {
      AllotmentValuesForCalculation: {
        MH: {
          vacancyAvailable: vacancy.MH,
          SC_ST_PH_BPL: {
            percentage: seats.MH["SC/ST/PH/BPL"].percentage,
            totalSeats: seats.MH["SC/ST/PH/BPL"].value,
          },
          ...Object.fromEntries(
            quota.slice(1).map((item) => [
              item,
              {
                percentage: seats.MH[item].percentage,
                totalSeats: seats.MH[item].value,
              },
            ])
          ),
        },
        LH: {
          vacancyAvailable: vacancy.LH,
          SC_ST_PH_BPL: {
            percentage: seats.LH["SC/ST/PH/BPL"].percentage,
            totalSeats: seats.LH["SC/ST/PH/BPL"].value,
          },
          ...Object.fromEntries(
            quota.slice(1).map((item) => [
              item,
              {
                percentage: seats.LH[item].percentage,
                totalSeats: seats.LH[item].value,
              },
            ])
          ),
        },
      },
    };
    setIsLoading(true);
    try {
      const res = await createAllotmentData(data);
      if (res.data.success) {
        console.log(res.data.message);
        setAllotmentSetId(res.data.AllotmentSetId);
        toast.success("Allotment created successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Allotment cannot be performed", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding allotment data", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  function AllotmentCard() {
    const AllotmentData = [
      {
        Sem: "S1",
        General: 10,
        SC: 20,
        ST: 30,
        PH: 30,
        BPL: 30,
      },
      {
        Sem: "S3",
        General: 10,
        SC: 20,
        ST: 30,
        PH: 30,
        BPL: 30,
      },
      {
        Sem: "S5",
        General: 10,
        SC: 20,
        ST: 30,
        PH: 30,
        BPL: 30,
      },
      {
        Sem: "S7",
        General: 10,
        SC: 20,
        ST: 30,
        PH: 30,
        BPL: 30,
      },
      {
        Sem: "S9",
        General: 10,
        SC: 20,
        ST: 30,
        PH: 30,
        BPL: 30,
      },
      {
        Sem: "M1",
        General: 10,
        SC: 20,
        ST: 30,
        PH: 30,
        BPL: 30,
      },
      {
        Sem: "M3",
        General: 10,
        SC: 20,
        ST: 30,
        PH: 30,
        BPL: 30,
      },
    ];

    return (
      <Card>
        <Tabs defaultValue="mh" className="w-[420px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mh">MH</TabsTrigger>
            <TabsTrigger value="lh">LH</TabsTrigger>
          </TabsList>
          <TabsContent value="mh">
            <CardHeader>
              <CardTitle className="text-base">Allotment 1</CardTitle>
            </CardHeader>
            <CardContent className="">
              <Table>
                <TableCaption className="text-sm">
                  A list of all MH seats available for next allotment
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r "></TableHead>
                    <TableHead className="bg-muted">General</TableHead>
                    <TableHead className="bg-muted">SC</TableHead>
                    <TableHead className="bg-muted">ST</TableHead>
                    <TableHead className="bg-muted">PH</TableHead>
                    <TableHead className="bg-muted">BPL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {AllotmentData.map((row) => (
                    <TableRow key={row.Sem}>
                      <TableCell className="font-medium border-r bg-muted">
                        {row.Sem}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.General}
                      </TableCell>
                      <TableCell>{row.SC}</TableCell>
                      <TableCell>{row.ST}</TableCell>
                      <TableCell>{row.PH}</TableCell>
                      <TableCell>{row.BPL}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit for 2nd Allotment </Button>
            </CardFooter>
          </TabsContent>
          <TabsContent value="lh">
            <CardHeader>
              <CardTitle>Allotment 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit for 2nd Allotment </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    );
  }

  const updateSeatsAndAvailableSeats = (hostelType) => {
    const totalSeats = Object.values(seats[hostelType]).reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    setAvailableSeats({
      ...availableSeats,
      [hostelType]: vacancy[hostelType] - totalSeats,
    });

    const updatedSeats = seats[hostelType];

    quota.forEach((item) => {
      const calculatedSeats = Math.round(
        (seats[hostelType][item].percentage / 100) * vacancy[hostelType]
      );
      updatedSeats[item] = { ...updatedSeats[item], value: calculatedSeats };
    });

    setSeats({ ...seats, [hostelType]: updatedSeats });
  };

  useEffect(() => {
    updateSeatsAndAvailableSeats("MH");
  }, [vacancy.MH, seats.MH]);

  useEffect(() => {
    updateSeatsAndAvailableSeats("LH");
  }, [vacancy.LH, seats.LH]);

  const handlePercentageChange = (e, item, hostelType) => {
    const percentage = parseFloat(e.target.value);
    const calculatedSeats = Math.floor(
      (percentage / 100) * vacancy[hostelType]
    );
    setSeatsDisplay({
      ...seatsDisplay,
      [hostelType]: {
        ...seatsDisplay[hostelType],
        [item]: percentage.toString(),
      },
    });

    setSeats({
      ...seats,
      [hostelType]: {
        ...seats[hostelType],
        [item]: { value: calculatedSeats, percentage },
      },
    });
  };

  const handleInputChange = (e, hostelType) => {
    const inputValue = e.target.value;

    const parsedValue = parseInt(inputValue);

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setVacancyDisplay({
        ...vacancyDisplay,
        [hostelType]: parsedValue.toString(),
      });
      setVacancy({ ...vacancy, [hostelType]: parsedValue });

      if (parsedValue === 0) {
        setAvailableSeats({ ...availableSeats, [hostelType]: inputValue });
        setSeatsDisplay({
          ...seatsDisplay,
          [hostelType]: {
            "SC/ST/PH/BPL": "0",
            S1: "0",
            S3: "0",
            S5: "0",
            S7: "0",
            PG: "0",
          },
        });
        setSeats({
          ...seats,
          [hostelType]: {
            "SC/ST/PH/BPL": { value: 0, percentage: 0 },
            S1: { value: 0, percentage: 0 },
            S3: { value: 0, percentage: 0 },
            S5: { value: 0, percentage: 0 },
            S7: { value: 0, percentage: 0 },
            PG: { value: 0, percentage: 0 },
          },
        });
      }
    } else {
      setVacancyDisplay({ ...vacancyDisplay, [hostelType]: "0" });
      setVacancy({ ...vacancy, [hostelType]: 0 });
    }
  };

  const renderTableRows = (hostelType) =>
    quota.map((item, index) => (
      <TableRow key={index}>
        <TableCell className="font-semibold">{item}</TableCell>
        <TableCell className="w-[140px]">
          <Input type="number" value={seats[hostelType][item].value} readOnly />
        </TableCell>
        <TableCell className="w-[140px] flex">
          <Input
            type="number"
            max="100"
            value={seatsDisplay[hostelType][item]}
            onChange={(e) => {
              if (e.target.value === "") {
                setSeatsDisplay({
                  ...seatsDisplay,
                  [hostelType]: {
                    ...seatsDisplay[hostelType],
                    [item]: "0",
                  },
                });

                setSeats({
                  ...seats,
                  [hostelType]: {
                    ...seats[hostelType],
                    [item]: { value: 0, percentage: 0 },
                  },
                });

                return;
              }

              const maxPossiblePercentage =
                100 -
                Object.values(seats[hostelType]).reduce(
                  (acc, curr) => acc + curr.percentage,
                  0
                ) +
                seats[hostelType][item].percentage;

              if (e.target.value < 0 || e.target.value > maxPossiblePercentage)
                return;

              handlePercentageChange(e, item, hostelType);
            }}
            disabled={vacancy[hostelType] === 0}
          />
        </TableCell>
      </TableRow>
    ));

  return (
    <div className="flex flex-row gap-x-4 w-full justify-center h-auto">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Vacancy</CardTitle>
          <CardDescription>
            Add the number of seats available for each quota
          </CardDescription>
        </CardHeader>
        <div className="flex flex-row ">
          {["MH", "LH"].map((hostelType) => (
            <CardContent key={hostelType}>
              <div className="flex gap-4 pb-2">
                <div className="flex space-y-2 flex-col">
                  <Label
                    className="line-clamp-1"
                    htmlFor={`vacancy-${hostelType}`}
                  >
                    No of Vacancy for {hostelType}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`vacancy-${hostelType}`}
                    type="number"
                    className="w-[140px]"
                    value={vacancyDisplay[hostelType]}
                    onChange={(e) => handleInputChange(e, hostelType)}
                  />
                </div>
                <div className="flex space-y-2 flex-col">
                  <Label className="line-clamp-1" htmlFor="availableseats">
                    Available Seats
                  </Label>
                  <Input
                    id="availableseats"
                    type="number"
                    className="w-1/2 disabled:bg-gray-100 disabled:text-gray-500"
                    value={availableSeats[hostelType]}
                    readOnly
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="mt-auto"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setVacancyDisplay({
                        ...vacancyDisplay,
                        [hostelType]: "0",
                      });
                      setVacancy({ ...vacancy, [hostelType]: 0 });
                      setAvailableSeats({ ...availableSeats, [hostelType]: 0 });
                      setSeatsDisplay({
                        ...seatsDisplay,
                        [hostelType]: {
                          "SC/ST/PH/BPL": "0",
                          S1: "0",
                          S3: "0",
                          S5: "0",
                          S7: "0",
                          PG: "0",
                        },
                      });
                      setSeats({
                        ...seats,
                        [hostelType]: {
                          "SC/ST/PH/BPL": { value: 0, percentage: 0 },
                          S1: { value: 0, percentage: 0 },
                          S3: { value: 0, percentage: 0 },
                          S5: { value: 0, percentage: 0 },
                          S7: { value: 0, percentage: 0 },
                          PG: { value: 0, percentage: 0 },
                        },
                      });
                    }}
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Quota</TableHead>
                    <TableHead>Seats Alotted</TableHead>
                    <TableHead>Percentage(%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{renderTableRows(hostelType)}</TableBody>
              </Table>
            </CardContent>
          ))}
        </div>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
            size={"lg"}
            disabled={
              isLoading ||
              vacancy.MH === 0 ||
              vacancy.LH === 0 ||
              availableSeats.MH != 0 ||
              availableSeats.LH != 0 ||
              availableSeats.MH < 0 ||
              availableSeats.LH < 0
            }
          >
            {isLoading ? (
              <div className="flex flex-row gap-x-2 items-center">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-50 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-base">Processing...</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
      <div className="space-y-4 w-auto overflow-y-auto max-h-[90vh] no-scrollbar hidden md:block">
        <AllotmentCard />
        <AllotmentCard />
      </div>
    </div>
  );
};

export default Allotmentpage;
