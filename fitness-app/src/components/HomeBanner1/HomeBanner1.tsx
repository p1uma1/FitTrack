import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import "./HomeBanner1.css";
import ReportPopup from "../ReportPopup/ReportPopup";

interface Report {
  type: string;
  data: { date: string; value: number }[];
  unit: string;
}

const HomeBanner1: React.FC = () => {
  const [data, setData] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reports/myreports", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInputChange = (reportType: string, value: string) => {
    setInputValues({ ...inputValues, [reportType]: value });
  };

  const handleUpdate = async (reportType: string) => {
    const inputValue = inputValues[reportType];
    if (!inputValue) {
      console.error("No value provided for update");
      return;
    }

    const updatedItem = {
      type: reportType, 
      date: new Date().toISOString(),
      value: parseFloat(inputValue),
    };

    try {
      const response = await fetch("http://localhost:3000/api/reports/myreports", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      // Update the state with the new data
      const updatedData = data.map((item) => {
        if (item.type === reportType) {
          return {
            ...item,
            data: [...item.data, { date: updatedItem.date, value: updatedItem.value }],
          };
        }
        return item;
      });

      setData(updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (loading) {
    return (
      <div className="meters">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="card" aria-hidden="true" key={index}>
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    
    <div className="meters">
      {selectedReport && (
  <ReportPopup
    report={selectedReport}
    onClose={() => {
      setSelectedReport(null);
      console.log('Close button triggered');
    }}
  />
)}

      {data?.length > 0 &&
        data.map((item: Report, index: number) => (
          <div className="meter-card" key={index}>
            <div className="meter-card-header">
              <div className="meter-card-header-box">
                <div className="meter-card-header-box-name">{item.type}</div>
                <div className="meter-card-header-box-value">
                  {item.data.length > 0 ? item.data[item.data.length - 1].value : 0} {item.unit}
                </div>
              </div>
            </div>

            <button className="meter-card-button" onClick={() => setSelectedReport(item)}>
              Show report <AiOutlineEye />
            </button>
            <div className="input-container">
              <input
                type="number"
                placeholder="Update Value"
                value={inputValues[item.type] || ""}
                onChange={(e) => handleInputChange(item.type, e.target.value)}
              />
              <button className="meter-card-button" onClick={() => handleUpdate(item.type)}>Update Value</button>
            </div>
          </div>
        ))}
      
    </div>
  );
};

export default HomeBanner1;
