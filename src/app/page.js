"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function StudentApplicationForm() {
  const [studentInfo, setStudentInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value,
     });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', studentInfo);
    // Add your logic to submit data to the server or perform other actions
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-200/45">
      <form className="bg-white w-1/2 rounded-md p-8 " onSubmit={handleSubmit}>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          value={studentInfo.firstName}
          onChange={handleInputChange}
        />

        <Label htmlFor="lastName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          value={studentInfo.lastName}
          onChange={handleInputChange}
        />

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={studentInfo.email}
          onChange={handleInputChange}
        />

        {/* Add more fields as needed */}

        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
