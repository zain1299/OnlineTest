import React from "react";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getUserDetails = async () => {
    const res = await axios.get(
      "https://mock-api.mortgagebasket.co.uk/v1/users?pageSize=100"
    );
    setState(res?.data?.data);
    setUser(res?.data?.data);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    if (search) {
      let filtered = state?.filter(
        (x) =>
          x.name.toLowerCase() === search?.toLowerCase() ||
          x.email.toLowerCase() === search?.toLocaleLowerCase()
      );

      setUser(filtered);
    }
  };

  const handleReset = () => {
    setUser(state);
    setSearch("");
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= user?.length / 5; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <div className="d-flex mt-4" style={{ float: "right" }}>
        <input
          type="text"
          placeholder="Search By Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="ml-4" onClick={handleSearch}>
          Search
        </button>

        <button onClick={handleReset}>Reset</button>
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Email</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {user?.slice((currentPage - 1) * 5, currentPage * 5).map((user) => (
            <tr key={user?.id}>
              <td>{user.name}</td>
              <td>{user?.date_of_birth}</td>
              <td>{user?.email}</td>
              <td>
                <img src={user?.imageUrl} alt="user" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="pagination">{renderPageNumbers()}</ul>
    </div>
  );
}

export default App;
