import React from "react";

const StatisticsTable = ({ usersStatistics, dateRange }) => {
  let yearsRange = [];
  for (let i = dateRange.start; i <= dateRange.end; i++) yearsRange.push(i);

  return (
    <table className="table card-table table-vcenter">
      <thead>
        <tr>
          <th>User</th>
          <th></th>
          {yearsRange.map((year,index) => (
            <th key={index}>{year}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {usersStatistics.map((userStatistics,indextr) => (
          <tr key={indextr} >
            <td className="w-1">
              <span
                className="avatar"
                style={{
                  backgroundImage: "url(" + userStatistics.profilePicture + ")",
                }}
              ></span>
            </td>
            <td className="">{userStatistics.name}</td>
            {yearsRange.map((year,index) => (
              <td className="" key={index}>{userStatistics.yearlyPublications[year] ?? 0}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatisticsTable;
