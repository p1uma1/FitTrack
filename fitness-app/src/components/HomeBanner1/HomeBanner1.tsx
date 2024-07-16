import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import "./HomeBanner1.css";
import ReportPopup from "../../components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";

const HomeBanner1 = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [inputValues, setInputValues] = useState<any>({});
  const [inputTargets, setInputTargets] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      

      const response = await fetch(
        `http://localhost:3000/api/reports/myreports`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if required
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
      setLoading(false); // Update loading state after successful data fetch
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
      setLoading(false); // Ensure loading state is updated in case of error
    }
  };

  useEffect(() => {
    getData();
  }, []); // Ensure getData is called only once on component mount

  const handleInputChange = (name: string, type: string, value: string) => {
    if (type === "value") {
      setInputValues({ ...inputValues, [name]: value });
    } else if (type === "goal") {
      setInputTargets({ ...inputTargets, [name]: value });
    }
  };

  const handleUpdate = (name: string, type: string) => {
    const updatedData = data.map((item) => {
      if (item.name === name) {
        if (type === "value" && inputValues[name] !== undefined) {
          item.value = parseFloat(inputValues[name]);
        } else if (type === "goal" && inputTargets[name] !== undefined) {
          item.goal = parseFloat(inputTargets[name]);
        }
      }
      return item;
    });
    setData(updatedData);
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
                <div className="card-header-box-name">{item.name}</div>
                <div className="card-header-box-value">
                  {item.value} {item.unit}
                </div>
              </div>
              <div className="card-header-box">
                <div className="card-header-box-name">Target</div>
                <div className="card-header-box-value">
                  {item.goal} {item.unit}
                </div>
              </div>
            </div>
            <CircularProgress
              variant="determinate"
              value={(item.value / item.goal) * 100}
              size={40}
            />
            <button onClick={() => setSelectedReport(item)}>
              Show report <AiOutlineEye />
            </button>
            <div className="input-container">
              <input
                type="number"
                placeholder="Update Value"
                value={inputValues[item.name] || ""}
                onChange={(e) =>
                  handleInputChange(item.name, "value", e.target.value)
                }
              />
              <button onClick={() => handleUpdate(item.name, "value")}>
                Update Value
              </button>
              <input
                type="number"
                placeholder="Update Target"
                value={inputTargets[item.name] || ""}
                onChange={(e) =>
                  handleInputChange(item.name, "goal", e.target.value)
                }
              />
              <button onClick={() => handleUpdate(item.name, "goal")}>
                Update Target
              </button>
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
