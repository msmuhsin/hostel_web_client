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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { createAllotmentData } from "@/lib/functions";
import { RotateCcw } from "lucide-react";

const Allotmentpage = () => {
  const quota = ["SC/ST/PH/BPL", "S1", "S3", "S5", "S7", "PG"];
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
    const res = await createAllotmentData(data);

    if (res.data.success) {
      console.log(res.data.message);
      toast.success("Allotment data added successfully", {
        position: "top-right",
      });
    } else {
      toast.error("Allotment data could not be added", {
        position: "top-right",
      });
    }
  };

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
    <Card>
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
              <div>
                <Label htmlFor={`vacancy-${hostelType}`}>
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
              <div>
                <Label htmlFor="availableseats">Available Seats</Label>
                <Input
                  id="availableseats"
                  type="number"
                  className="w-[140px] disabled:bg-gray-100 disabled:text-gray-500"
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
          disabled={
            vacancy.MH === 0 ||
            vacancy.LH === 0 ||
            availableSeats.MH != 0 ||
            availableSeats.LH != 0 ||
            availableSeats.MH < 0 ||
            availableSeats.LH < 0
          }
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Allotmentpage;
