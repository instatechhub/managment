import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import dayjs from "dayjs";
import useManagerStore from "../../Store/AuthStore/ManagerStore";

const statusColors = {
  Present: "bg-success text-white",
  Absent: "bg-danger text-white",
  "Half Day": "bg-warning text-dark",
  "Not Marked": "bg-secondary text-white",
};

const EmployeeAttendance = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const month = queryParams.get("month");
  const year = queryParams.get("year");

  const { viewSingleAttendance } = useManagerStore();

  const [records, setRecords] = useState([]);
  const [employeeName, setEmployeeName] = useState("Unknown");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewSingleAttendance({
          employeeId: id,
          month: parseInt(month),
          year: parseInt(year),
        });

        if (response?.attendance?.length > 0) {
          const formatted = response.attendance.map((rec) => ({
            date: dayjs(rec.date).format("YYYY-MM-DD"),
            status: rec.status,
          }));
          setRecords(formatted);
          setEmployeeName(response.name || "Unknown");
        } else {
          setRecords([]);
          setEmployeeName(response.name || "Unknown");
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    if (id && month && year) {
      fetchData();
    }
  }, [id, month, year, viewSingleAttendance]);

  const getDaysInMonth = (year, monthIndex) => {
    const days = [];
    const totalDays = dayjs(`${year}-${monthIndex + 1}-01`).daysInMonth();
    for (let i = 1; i <= totalDays; i++) {
      days.push(dayjs(`${year}-${monthIndex + 1}-${i}`).format("YYYY-MM-DD"));
    }
    return days;
  };

  const getStatus = (date) => {
    const found = records.find((r) => r.date === date);
    return found ? found.status : "Not Marked";
  };

  const targetMonth = parseInt(month) - 1;
  const targetYear = parseInt(year);
  const days = getDaysInMonth(targetYear, targetMonth);

  return (
    <Container className="mt-4">
      <h4 className="mb-3 text-center">
        {employeeName}'s Attendance - {dayjs().month(targetMonth).format("MMMM")} {targetYear}
      </h4>

      <div className="d-flex flex-wrap gap-0 justify-content-start">
        {days.map((date) => {
          const status = getStatus(date);
          const statusClass = statusColors[status] || "bg-light";

          return (
            <div
              key={date}
              className={`p-2 border rounded text-center ${statusClass}`}
              style={{
                width: "14.28%",
                minHeight: "90px",
                fontSize: "0.85rem",
                lineHeight: "1.3",
              }}
            >
              <div className="fw-bold">{dayjs(date).format("ddd")}</div>
              <div>{dayjs(date).date()}</div>
              <small className="d-block mt-1">{status}</small>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default EmployeeAttendance;
