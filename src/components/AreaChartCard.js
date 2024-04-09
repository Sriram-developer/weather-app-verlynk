import React, { useEffect, useState } from 'react';
import { Card,Title,AreaChart } from "@tremor/react";


function AreaChartCard({ weatherDetails }) {
    const [chartData, setChartData] = useState([]);
 useEffect(() => {
    const hourly = weatherDetails?.hourly?.time?.map((time) => new Date(time).toLocaleString("en-US , { hour:"numeric", hour12: false }).slice(0, 24))

    hourly?.map((hour, i) => (
        setChartData({
            Time: Number(hour),
            "Temperature (C)": weatherDetails?.hourly?.apparent_temperature[i],
        })
    ) )
 }, [])
  return(
     <Card>
  <Title>Temperature v/s Time</Title>
  <AreaChart data={chartData} index="Time" categories={['Temperature (C)']} colors='{["indigo"]}'/>
  </Card>
  );
}

export default AreaChartCard