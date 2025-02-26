const PROXY_CONFIG = [
    {
      context: [
        "/weatherforecast",
        "/api/Account",
        "/api/student", //<--- define controller name
        "/api/employee",
        "/api/ClassRoom", //<--- define controller name
        "/api/AppResource",
        "/api/Vendor",
        "/api/FinancialOperations",
        "/api/BusRoute",
        "/api/appsettings",
        "/api/ClassRoomManagement",
        "/api/learningManagement",
        "/api/AppSettings",
        "/api/ClassRoomStudentManagement",
        "/api/Identity",
        "/api/File",
        "/api/ParentStudentDashboard",
        "/register",
        "/UploadedFiles", //<--- resolved conflict
        "/api/file",
        "/api/Welcome"   ,
        "/api/StudentDashboard",
        "/api/EmployeeDashboard",
        "/api/RevenueForCast",
        "/api/StudentBehaviour"
      ],
      target: "https://localhost:7254/",
      secure: false,
    },
  ];
  
  module.exports = PROXY_CONFIG;
  