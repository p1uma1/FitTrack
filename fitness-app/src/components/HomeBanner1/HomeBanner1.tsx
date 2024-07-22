import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import "./HomeBanner1.css";
import ReportPopup from "../ReportPopup/ReportPopup";

const HomeBanner1 = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [inputValues, setInputValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/reports/myreports`, {
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setInputValues({ ...inputValues, [name]: value });
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

    // Send update to the server
    try {
      const response = await fetch(`http://localhost:3000/api/reports/myreports`, {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="meters">
      {data?.length > 0 &&
        data.map((item: any, index: number) => (
          <div className="card" key={index}>
            <div className="card-header">
              <div className="card-header-box">
                <div className="card-header-box-name">{item.type}</div>
                <div className="card-header-box-value">
                  {item.data.length > 0 ? item.data[item.data.length - 1].value : 0} {item.unit}
                </div>
              </div>
            </div>
           
            <button onClick={() => setSelectedReport(item)}>
              Show report <AiOutlineEye />
            </button>
            <div className="input-container">
              <input
                type="number"
                placeholder="Update Value"
                value={inputValues[item.type] || ""}
                onChange={(e) => handleInputChange(item.type, e.target.value)}
              />
              <button onClick={() => handleUpdate(item.type)}>Update Value</button>
            </div>
          </div>
        ))}
      {selectedReport && (
        <ReportPopup
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

export default HomeBanner1;
