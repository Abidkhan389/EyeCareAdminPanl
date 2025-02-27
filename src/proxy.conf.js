const PROXY_CONFIG = [
    {
      context: [
        "/weatherforecast",
        //<------------------- EyeCare Admin Panel Control ----------------->

        //<---------- Identity Controls-------->
        "/api/Account",
        //<---------- Medicine Type Controls-------->

        "/api/Medicinetype",
        
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
      ],
      target: "https://localhost:7254/",
      secure: false,
    },
  ];
  
  module.exports = PROXY_CONFIG;
  