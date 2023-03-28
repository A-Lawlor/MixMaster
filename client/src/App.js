import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Vault from "./profile_pages/vault";
import Storage from "./profile_pages/storage";
import Homepage from "./pages/homepage";
import GenerateDrink from "./pages/generatedrink";
import About from "./pages/about";
import Contact from "./pages/contact";
import Trending from "./pages/trending";
import Mixology from "./pages/mixology";

const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<Homepage />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/homepage" element={<Homepage />} />
       <Route path="/generatedrink" element={<GenerateDrink />} />
       <Route path="/storage" element={<Storage />} />
       <Route path="/vault" element={<Vault />} />
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/create" element={<Create />} />
       <Route path="/vault" element={<Vault />} />
       <Route path="/storage" element={<Storage />} />
       <Route path="/trending" element={<Trending />} />
       <Route path="/mixology" element={<Mixology />} />
       <Route path="/recordlist" element={<RecordList />} />
     </Routes>
   </div>
 );
};
 
export default App;