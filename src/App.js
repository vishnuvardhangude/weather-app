import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';

function App() {

  const handleOnSearchChange = (searchData) => {
    // console.log("test")
    console.log(searchData)
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather />
      {/* <Forecast /> */}
    </div>
  );
}

export default App;
