import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import dayjs from 'dayjs';

const attendanceRecords = {
  1: [
    { date: '2025-06-01', status: 'Present' },
    { date: '2025-06-02', status: 'Absent' },
    { date: '2025-06-03', status: 'Half Day' },
    { date: '2025-06-04', status: 'Present' },
    { date: '2025-06-05', status: 'Absent' },
    { date: '2025-06-06', status: 'Present' },
    { date: '2025-06-07', status: 'Present' },
  ],
  2: [
    { date: '2025-06-01', status: 'Present' },
    { date: '2025-06-02', status: 'Present' },
    { date: '2025-06-03', status: 'Absent' },
  ],
  3: [
    { date: '2025-06-01', status: 'Present' },
    { date: '2025-06-02', status: 'Present' },
    { date: '2025-06-03', status: 'Absent' },
  ],
};

const employeeNames = {
  1: 'Ravi Kumar',
  2: 'Anjali Sharma',
  3: 'Mohit Sinha',
};

const statusColors = {
  Present: 'bg-success text-white',
  Absent: 'bg-danger text-white',
  'Half Day': 'bg-warning text-dark',
  'Not Marked': 'bg-secondary text-white',
};

const EmployeeAttendance = () => {
  const { id } = useParams();
  const records = attendanceRecords[id] || [];
  const employeeName = employeeNames[id] || 'Unknown';

  const firstDate = records.length > 0 ? records[0].date : null;
  const targetMonth = firstDate ? dayjs(firstDate).month() : dayjs().month();
  const targetYear = firstDate ? dayjs(firstDate).year() : dayjs().year();

  const getDaysInMonth = (year, month) => {
    const days = [];
    const totalDays = dayjs(`${year}-${month + 1}-01`).daysInMonth();
    for (let i = 1; i <= totalDays; i++) {
      days.push(dayjs(`${year}-${month + 1}-${i}`).format('YYYY-MM-DD'));
    }
    return days;
  };

  const getStatus = (date) => {
    const found = records.find((r) => r.date === date);
    return found ? found.status : 'Not Marked';
  };

  const days = getDaysInMonth(targetYear, targetMonth);

  return (
    <Container className="mt-4">
      <h4 className="mb-3 text-center">
        {employeeName}'s Attendance - {dayjs().month(targetMonth).format('MMMM')} {targetYear}
      </h4>

      <div className="d-flex flex-wrap gap-0 justify-content-start">
        {days.map((date) => {
          const status = getStatus(date);
          const statusClass = statusColors[status] || 'bg-light';

          return (
            <div
              key={date}
              className={`p-2 border rounded text-center ${statusClass}`}
              style={{
                width: '14.28%',
                minHeight: '90px',
                fontSize: '0.85rem',
                lineHeight: '1.3',
              }}
            >
              <div className="fw-bold">{dayjs(date).format('ddd')}</div>
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
