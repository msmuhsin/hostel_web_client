# Project Documentation

## Project Overview
- *Project Name:* Hostel management API
- *Description:* A RESTful API for managing hostel admission process.

## API Implementation
- *Description:* This section outlines the API endpoints and functionality that need to be implemented for the Hostel management API.
  
### Endpoints to Implement

#### Middlewares (Utils) 

1. *JWT Middleware*
   - Description: Middleware for verifying JWT tokens.
   - Deadline: [Deadline]
   - Assigned To:[Developer Name]


#### Authentication Endpoints

1. *POST /auth/register*
   - Description: Register a new staff/admin.
   - Deadline: [Deadline]
   - Assigned To: [Developer Name]


2. *POST /auth/login*
    - Description: Login a user.
    - Deadline: [Deadline]
    - Assigned To: [Developer Name]

3. *PATCH/update/password*
    - Description: update user's password.
    - Deadline: [Deadline]
    - Assigned To: [Developer Name]


#### User Endpoints

1. *GET /user*
   - Description: Retrieve all student details.
   - Deadline: [Deadline]
   - Assigned To: [Developer Name]


2. *PATCH /user/:id*
   - Description: Update student data specified by ID.
   - Deadline: [Deadline]
   - Assigned To: [Developer Name]


3. *POST /user*
   - Description: Create a new student.
   - Deadline: [Deadline]
   - Assigned To: [Developer Name]

4. *POST /student/scorecalculaton*
   - Description:calculation of score of a student according to weightage
   - Deadline: [Deadline]
   - Assigned To:developer Name

5. *POST /room/allocation*
   - Description:calculate no of rooms as vacancies
   - Deadline: [Deadline]
   - Assigned To:developer Name

6. *POST /room/allotment*
   - Description:allotment of a room
   - Deadline: [Deadline]
   - Assigned To:developer Name
   

#### Scheme Endpoints

1. *GET /scheme*
   - Description: Retrieve all schemes.
   - Deadline: [Deadline]
   - Assigned To: [developer name]

2. *GET /scheme/:id*
   - Description: Retrieve a specific scheme by ID.
   - Deadline: [Deadline]
   - Assigned To: [Developer Name]

3. *POST /scheme*
   - Description: Create a new scheme.
   - Deadline: [Deadline]
   - Assigned To: [Developer Name]

4. *PUT /scheme/:id*
   - Description: Update a specific scheme by ID.
   - Deadline: [Deadline]
   - Assigned To: [Developer Name]


5. *DELETE /scheme/:id*
   - Description: Delete a specific scheme by ID.
   - Deadline: [Deadline]
   - Assigned To: [Developer Name]



## Testing and Debugging
- *Description:* This section outlines the testing and debugging phase of the project.

### Testing Plan
- *Unit Testing:* Test each API using Postman or Hoppscotch using dummy data.