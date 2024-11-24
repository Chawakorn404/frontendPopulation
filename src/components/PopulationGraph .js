import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import regionData from "./region.json"; 
import flagData from "./flag.json";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FaPlay,FaStop  } from 'react-icons/fa';

ChartJS.register(...registerables);

const yearPointerPlugin = {
  id: 'yearPointer',
  afterDraw: (chart) => {
    const { ctx, scales } = chart;
    if (!scales.x2) return;

    const currentYear = chart.yearPointer || 1950;
    const xPixel = scales.x2.getPixelForValue(currentYear);
    
    const x2Scale = scales.x2;
    const tickHeight = x2Scale.options.ticks.font?.size || 12; 
    const tickPadding = x2Scale.options.ticks.padding || 4; 
    
    const triangleBase = x2Scale.top - tickHeight - tickPadding +10;
    const triangleHeight = 8; 

    // Draw the pointer triangle
    ctx.beginPath();
    ctx.moveTo(xPixel - 8, triangleBase);
    ctx.lineTo(xPixel + 8, triangleBase);
    ctx.lineTo(xPixel, triangleBase + triangleHeight);
    ctx.closePath();
    ctx.fillStyle = '#A0A0A0';
    ctx.fill();
    ctx.restore();
  }
};
const HorizontalChart = () => {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Population",
        data: [],
        backgroundColor: [], 
        borderColor: "#fff",
        borderWidth: 1,
        fill: false,
      },
    ],
  });
  const [regions] = useState(regionData); 
  const [activeRegions, setActiveRegions] = useState([
    "Asia",
    "Europe",
    "Africa",
    "Oceania",
    "Americas",
  ]);
  const [allPopulationData, setAllPopulationData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(1950);
  const chartRef = useRef(null);
  const flagImagesRef = useRef({});
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);


  const preloadFlagImages = (labels) => {
    labels.forEach(countryName => {
      const flagDataItem = flagData.find(flag => flag.name === countryName);
      if (flagDataItem && !flagImagesRef.current[countryName]) {
        const image = new Image();
        image.src = flagDataItem.flag;
        image.onload = () => {
          flagImagesRef.current[countryName] = image;
        };
      }
    });
  };
  const regionColors = {
    Asia: "#5E47E3",
    Europe: "#A46EE4",
    Africa: "#B55D76",
    Oceania: "#FF7A32",
    Americas: "#FBC135",
  };
  const customFlagPlugin = {
    id: "customFlag",
    afterDatasetsDraw: (chart) => {
      const { ctx } = chart;
      
      chart.data.datasets.forEach((dataset) => {
        const meta = chart.getDatasetMeta(0);
        if (!meta || !meta.data) return;

        meta.data.forEach((bar, index) => {
          const countryName = chart.data.labels[index];
          const loadedImage = flagImagesRef.current[countryName];
          
          if (loadedImage && bar.base !== undefined) {
            const barWidth = bar.x;  
            const barHeight = bar.height;
            const barY = bar.y;

            const flagSize = barHeight * 0.8;
            
            const flagX = barWidth - flagSize - (flagSize * 0.1);
            const flagY = barY - (flagSize) / 2;
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(
              flagX + flagSize / 2,  
              flagY + flagSize / 2,  
              flagSize / 2,         
              0,
              Math.PI * 2
            );
            ctx.closePath();
            ctx.clip();
            
            // Draw the flag image
            ctx.drawImage(
              loadedImage,
              flagX,
              flagY,
              flagSize,
              flagSize
            );
            
            ctx.restore();
          }
        });
      });
    }
  };
 
const handlePlayStop = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setSelectedYear(1950);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      autoIncreaseYear();
    }
  };
  const toggleRegion = (region) => {
    setActiveRegions(
      (prevRegions) =>
        prevRegions.includes(region)
          ? prevRegions.filter((r) => r !== region) 
          : [...prevRegions, region]
    );
  };

  const regionDotStyle = (region) => ({
    width: "12px",
    height: "12px",
    borderRadius: "25%",
    backgroundColor: regionColors[region] || "#000",
  });

  
    useEffect(() => {
      document.title = 'World Population 1950 - 2021';
    }, []);
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const countriesResponse = await fetch(
          "https://backend-btf8.onrender.com/api/countries"
        );
        const populationResponse = await fetch(
          "https://backend-btf8.onrender.com/api/population"
        );
        const countriesData = await countriesResponse.json();
        const populationData = await populationResponse.json();

        setCountriesData(countriesData);
        setAllPopulationData(populationData);
        updateChartData(
          countriesData,
          populationData,
          selectedYear,
          activeRegions
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countriesData.length && allPopulationData.length) {
      updateChartData(
        countriesData,
        allPopulationData,
        selectedYear,
        activeRegions
      );
      calculateTotalPopulation();
    }
  }, [selectedYear, activeRegions, countriesData, allPopulationData]);
  useEffect(() => {
    if (chartData.labels.length > 0) {
      preloadFlagImages(chartData.labels);
    }
  }, [chartData.labels]);
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.yearPointer = selectedYear;
      chart.update('none'); 
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear >= 2021) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    }
  }, [selectedYear]);

   const updateChartData = (countriesData, populationData, year, activeRegions) => {
    const prevData = chartData.datasets[0]?.data || [];
    const prevLabels = chartData.labels || [];
    
    const countryPopulation = countriesData
      .map((country) => {
        const populationForYear = populationData
          .filter(
            (entry) =>
              entry["Country name"] === country["Country name"] &&
              entry.Year === year
          )
          .reduce((sum, entry) => sum + entry.Population, 0);

        return { 
          name: country["Country name"], 
          population: populationForYear,
          region: Object.entries(regions).find(([key, countries]) =>
            countries.includes(country["Country name"])
          )?.[0]
        };
      })
      .filter((item) => item.region && activeRegions.includes(item.region));

    const topCountries = countryPopulation
      .sort((a, b) => b.population - a.population)
      .slice(0, 12);

    const sortedCountries = topCountries.map((item) => item.name);
    const sortedPopulations = topCountries.map((item) => item.population);
    const sortedColors = topCountries.map((item) => regionColors[item.region] || "#000");

    setChartData({
      labels: sortedCountries,
      datasets: [{
        label: "Population",
        data: sortedPopulations,
        backgroundColor: sortedColors,
        borderColor: "#fff",
        borderWidth: 1,
      }],
    });
  };
  const autoIncreaseYear = () => {
    let currentYear = selectedYear;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (currentYear >= 2021) {
        currentYear = 1950;
      } else {
        currentYear += 1;
      }
      setSelectedYear(currentYear);
    }, 200);
  };
  
  
  
  
  const calculateTotalPopulation = () => {
    const populationForActiveRegions = allPopulationData
      .filter((entry) => entry.Year === selectedYear)
      .filter((entry) => {
        const countryRegion = Object.entries(regions).find(
          ([region, countries]) => countries.includes(entry["Country name"])
        );
        
        return countryRegion && activeRegions.includes(countryRegion[0]);
      })
      .reduce((sum, entry) => sum + entry.Population, 0);

    return populationForActiveRegions;
  };

  const totalPopulation = calculateTotalPopulation();

  return (
    <div className="container">
      <p className="fs-4 fw-bold mt-3" >
        Population growth per country, 1950 to 2021
      </p>
      <p className="fs-6" style={{marginTop: "-20px" }}>
        Click on the legend below to filter by continent 👇
      </p>
      <div
        style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
      >
        <p className="fw-bold">Region:</p>
        {Object.keys(regionColors).map((region) => (
          <div className="fs-6"
            key={region}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: "8px",
              gap: "8px",
              opacity: activeRegions.includes(region) ? 1 : 0.5, 
              transition: "opacity 0.3s ease-in-out", 
            }}
            onClick={() => toggleRegion(region)}
          >
            <div style={regionDotStyle(region)}></div>
            <span>{region}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
        }}
      >
        {chartData.labels && (
         <Bar
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          indexAxis: "y",
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            datalabels: {
              align: "right",
              anchor: "end",
              padding: 5,
              color: "#A0A0A0",
              offset: 10,
              font: { size: 14 },
              formatter: (value) => value.toLocaleString(),
            },
          },
          animation: {
            duration: 500,
            easing: 'easeInOutQuad',
          },
          scales: {
            x: {
              display: true,
              position: "top",
              grid: { display: false },
              ticks: {
                callback: (value) => value.toLocaleString(),
                maxTicksLimit: 3,
                font: {
                  size: 14 
                },
              },
            },
            y: {
              display: true,
              beginAtZero: true,
              ticks: {
                callback: (value, index) => chartData.labels[index],
                font: {
                  size: 14, 
                },
              },
            },
            x2: {
              display: true,
              position: "bottom",
              type: "linear",
              min: 1950,
              max: 2022,
              ticks: {
                stepSize: 4,
                callback: (value) => value.toString(),
                font: {
                  size: 14 
                },
                padding: 4 
              },
              grid: { display: false },
            }
          },
          layout: {
            padding: {bottom: 10 } 
          },
          transitions: {
            active: {
              animation: {
                duration: 500,
                easing: 'easeInOutQuad'
              }
            }
          }
        }}
        plugins={[customFlagPlugin, ChartDataLabels, yearPointerPlugin]}
      />

        )}

        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "0px",
            textAlign: "right",
            color: "#A0A0A0",
          }}
        >
          <div style={{ fontSize: "5rem", fontWeight: "bold", color: "grey" }}>
            {selectedYear}
          </div>

          <div
            style={{ fontSize: "2rem", fontWeight: "normal", color: "grey" , marginTop: "-20px" }}
          >
            {"Total: "}
            {totalPopulation.toLocaleString()}
          </div>
        </div>
      </div>

      <button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: isPlaying ? "#A0A0A0" : "#A0A0A0",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          color: "white",
          fontSize: "24px",
          transition: "background-color 0.3s ease",
        }}
        onClick={handlePlayStop}
      >
        {isPlaying ? <FaStop /> : <FaPlay />}
      </button>

      <div className="mt-2">
        <p>
          Source: <a href="https://ourworldindata.org/" target="_blank" style={{ color: "black" }}>Our World in Data</a>
        </p>
      </div>
    </div>
  );
};

export default HorizontalChart;
