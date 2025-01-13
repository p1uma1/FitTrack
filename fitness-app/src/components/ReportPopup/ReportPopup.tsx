import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './ReportPopup.css';
import CloseIcon from '@mui/icons-material/Close';

interface Report {
  type: string;
  unit: string;
  data: Array<{ date: string; value: number }>;
}

interface ReportPopupProps {
  report: Report;
  onClose: () => void;
}

const ReportPopup: React.FC<ReportPopupProps> = ({ report, onClose }) => {
  const color = 'var(--red)'; // Changed from yellow to red
  const chartsParams = {
    height: 300,
  };
  const [dataS1, setDataS1] = useState<{
    data: number[];
    title: string;
    color: string;
    xAxis: {
      data: Date[];
      label: string;
      scaleType: string;
    };
  } | null>(null);

  const getDataForS1 = () => {
    if (!report || !report.data || report.data.length === 0) {
      return;
    }

    const dataForLineChart = report.data.map((item) => item.value);
    const dataForXAxis = report.data.map((item) => new Date(item.date));

    setDataS1({
      data: dataForLineChart,
      title: `${report.type} Intake`,
      color: color,
      xAxis: {
        data: dataForXAxis,
        label: 'Last 10 Days',
        scaleType: 'time',
      },
    });
  };

  useEffect(() => {
    getDataForS1();
  }, [report]);

  return (
    <div className='report-popup'>
      <div className='popup-content'>
      <button className="close-button" onClick={() => {
  console.log('Close button clicked inside ReportPopup'); // This should print
  onClose(); // Ensure this function is called after the log
}}>
  <CloseIcon />
</button>

        <div className='s1'>
          {dataS1 && (
            <LineChart
              xAxis={[
                {
                  id: 'Day',
                  data: dataS1.xAxis.data,
                   scaleType: dataS1.xAxis.scaleType as "time",
                  label: dataS1.xAxis.label,
                  valueFormatter: (date: Date) => date.getDate().toString(),
                },
              ]}
              series={[
                {
                  data: dataS1.data,
                  label: dataS1.title,
                  color: dataS1.color,
                },
              ]}
              {...chartsParams}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;
