"use client";

import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const Allotmentpage = () => {
  const quota = ["SC/ST/PH/BPL", "S1", "S3", "S5", "S7", "PG"];
  const [vacancy, setVacancy] = useState(0);
  const [vacancyDisplay, setVacancyDisplay] = useState("0");
  const [type, setType] = useState("MH");
  const [seatsDisplay, setSeatsDisplay] = useState({
    "SC/ST/PH/BPL": "0",
    S1: "0",
    S3: "0",
    S5: "0",
    S7: "0",
    PG: "0",
  });
  const [seats, setSeats] = useState({
    "SC/ST/PH/BPL": {
      value: 0,
      percentage: 0,
    },
    S1: {
      value: 0,
      percentage: 0,
    },
    S3: {
      value: 0,
      percentage: 0,
    },
    S5: {
      value: 0,
      percentage: 0,
    },
    S7: {
      value: 0,
      percentage: 0,
    },
    PG: {
      value: 0,
      percentage: 0,
    },
  });
  const [availableSeats, setAvailableSeats] = useState(0);

  useEffect(() => {
    const totalSeats = Object.values(seats).reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    setAvailableSeats(vacancy - totalSeats);

    const updatedSeats = seats;
    quota.forEach((item) => {
      const calculatedSeats = Math.round(
        (seats[item].percentage / 100) * vacancy
      );
      updatedSeats[item].value = calculatedSeats;
    });
    setSeats(updatedSeats);
  }, [vacancy, seats]);

  const handlePercentageChange = (e, item) => {
    const percentage = parseInt(e.target.value);
    const calculatedSeats = Math.round((percentage / 100) * vacancy);
    setSeatsDisplay({ ...seatsDisplay, [item]: percentage.toString() });
    setSeats({ ...seats, [item]: { value: calculatedSeats, percentage } });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue);

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setVacancyDisplay(parsedValue.toString());
      setVacancy(parsedValue);
      if (parsedValue == 0) {
        setAvailableSeats(0);
        setSeatsDisplay({
          "SC/ST/PH/BPL": "0",
          S1: "0",
          S3: "0",
          S5: "0",
          S7: "0",
          PG: "0",
        });
        setSeats({
          "SC/ST/PH/BPL": {
            value: 0,
            percentage: 0,
          },
          S1: {
            value: 0,
            percentage: 0,
          },
          S3: {
            value: 0,
            percentage: 0,
          },
          S5: {
            value: 0,
            percentage: 0,
          },
          S7: {
            value: 0,
            percentage: 0,
          },
          PG: {
            value: 0,
            percentage: 0,
          },
        });
      }
    } else {
      setVacancyDisplay("0");
      setVacancy(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vacancy</CardTitle>
        <CardDescription>
          Add the number of seats available for each quota
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 pb-2">
          <div>
            <Label htmlFor="vacancy">
              No of Vacancy <span className="text-red-500">*</span>
            </Label>
            <Input
              id="vacancy"
              type="number"
              className="w-[140px]"
              value={vacancyDisplay}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="availableseats">Available Seats</Label>
            <Input
              id="availableseats"
              type="number"
              className="w-[140px] disabled:bg-gray-100 disabled:text-gray-500"
              value={availableSeats}
              readOnly
              defaultValue="0"
            />
          </div>
          <div>
            <Label htmlFor="hosteltype">
              Type <span className="text-red-500">*</span>
            </Label>
            <RadioGroup defaultValue="MH" id="hosteltype" className="flex py-2">
              <RadioGroupItem
                value="MH"
                id="MH"
                onChange={() => setType("MH")}
              />
              <Label htmlFor="MH">MH</Label>
              <RadioGroupItem
                value="LH"
                id="LH"
                onChange={() => setType("LH")}
              />
              <Label htmlFor="LH">LH</Label>
            </RadioGroup>
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
          <TableBody>
            {quota.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{item}</TableCell>
                <TableCell>
                  <Input type="number" value={seats[item].value} readOnly />
                </TableCell>
                <TableCell className="w-[140px] flex">
                  <Input
                    type="number"
                    defaultValue="0"
                    max="100"
                    value={seatsDisplay[item]}
                    onChange={(e) => {
                      const maxPossiblePercentage =
                        100 -
                        Object.values(seats).reduce(
                          (acc, curr) => acc + curr.percentage,
                          0
                        ) +
                        seats[item].percentage;

                      if (
                        e.target.value < 0 ||
                        e.target.value > maxPossiblePercentage
                      ) {
                        return;
                      }
                      handlePercentageChange(e, item);
                    }}
                    disabled={vacancy === 0}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-full flex justify-end">
          <button
            className="bg-blue-500  mr-4 text-white px-4 py-2 rounded-md"
            type="button"
          >
            Submit
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Allotmentpage;
