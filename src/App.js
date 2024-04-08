import Select from "react-select";

function App() {
  return (
    <div>
      {/* Sidebar */}
      <div className="flex flex-col space-y-3">
       {/* Form */}
       <Select/>

       <Select/>
       <button className="bg-green-400 w-full py-3 text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out">Get Weather</button>
      </div>
      {/* Body */}
      <div></div>
    </div>
  );
}

export default App;
