import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminPage = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [autoType, setAutoType] = useState("");
  const [availability, setAvailability] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [driver, setDriver] = useState(null);

  // const adminToken = localStorage.getItem('adminToken');
  const adminUsername = localStorage.getItem("adminUsername");

  // Check if the admin is authenticated
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      // Redirect to login page if no token is found
      navigate("/adminLogin");
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`http://localhost:9090/api/drivers/admin/${adminUsername}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Driver not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setDrivers(data);
      })
      .catch((error) => {
        console.error("Error fetching driver details:", error);
      })
      .finally(() => setLoading(false));
  }, [adminUsername]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const driverData = {
      name,
      vehicleNumber,
      autoType,
      available: availability,
      email,
    };

    fetch("http://localhost:9090/api/drivers/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(driverData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Driver registered:", data);

        // Add the new driver to the list of drivers
        setDrivers((prevDrivers) => [...prevDrivers, data]);

        // Clear the form inputs after registration
        setName("");
        setVehicleNumber("");
        setAutoType("");
        setAvailability(false);
        setEmail("");
      })
      .catch((error) => {
        console.error("Error registering driver:", error);
      });
  };

  const handleUpdateAvailability = (driverName, currentAvailability) => {
    const updatedAvailability = !currentAvailability;

    fetch(`http://localhost:9090/api/drivers/${driverName}/availability`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify({ available: updatedAvailability }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update availability");
        }
        return response.json();
      })
      .then((updatedDriver) => {
        setDrivers((prevState) => ({
          ...prevState,
          available: updatedDriver.available,
        }));
      })
      .catch((error) => {
        console.error("Error updating availability:", error);
        // Add error handling UI feedback here
      });
  };

  const handleDeleteDriver = (driverName) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      fetch(`http://localhost:9090/api/drivers/${driverName}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          adminUsername: localStorage.getItem("adminUsername"),
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete driver");
          setDrivers(null);
        })
        .catch((error) => console.error("Error deleting driver:", error));
    }
  };

  if (loading) {
    return <div>Loading drivers...</div>;
  }

  if (!drivers) {
    return <div>No matching driver profile found.</div>;
  }

  console.log("Admin Username:", adminUsername);
  console.log("Drivers Array:", drivers);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
    navigate("/adminLogin"); // Redirect to the login page
  };

  return (
    <div className="containerAdmin">
      <button onClick={handleLogout} className="adminLogout">Logout</button>
      <h1 className="titleAdmin">Admin Page</h1>
      <p className="descriptionAdmin">
        Auto drivers can register here and manage their slots.
      </p>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group Adminform">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group Adminform">
          <label htmlFor="vehicle-number">Vehicle Number:</label>
          <input
            type="text"
            id="vehicle-number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group Adminform">
          <label htmlFor="auto-type">Auto Type:</label>
          <select
            id="auto-type"
            value={autoType}
            onChange={(e) => setAutoType(e.target.value)}
            required
          >
            <option value="">Select Auto Type</option>
            <option value="3-seat">3-Seat</option>
            <option value="6-seat">6-Seat</option>
          </select>
        </div>
        <div className="form-group Adminform">
          <label htmlFor="availability">
            <input
              type="checkbox"
              id="availability"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />{" "}
            Available Now
          </label>
        </div>
        <div className="form-group Adminform">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button AdminButton">
          Submit
        </button>
      </form>

      <h2 className="driverHeader">Driver Profile</h2>
      {drivers ? (
        <div className="driver-card">
          <h3>{drivers.name}</h3>
          <p>Vehicle Number: {drivers.vehicleNumber}</p>
          <p>Auto Type: {drivers.autoType}</p>
          <p>Available: {drivers.available ? "Yes" : "No"}</p>
          <p>Email: {drivers.email}</p>
          <button
            onClick={() =>
              handleUpdateAvailability(drivers.name, drivers.available)
            }
            className="update-availability-btn"
          >
            Set Available: {drivers.available ? "No" : "Yes"}
          </button>
          <button
            onClick={() => handleDeleteDriver(drivers.name)}
            className="delete-btn"
          >
            Delete
          </button>
          <button onClick={()=>navigate('/driverBookings')} className="viewData">View Booking Data</button>
      
        </div>
      ) : (
        <p>No driver registered yet.</p>
      )}
    
     
        
    
    </div>
    
  );
};

export default AdminPage;
