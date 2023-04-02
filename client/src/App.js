import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import Vault from "./profile_pages/vault";
import Storage from "./profile_pages/storage";
import StorageAdd from "./profile_pages/storageAdd";
import EditProfile from "./profile_pages/editprofile";
import Homepage from "./pages/homepage";
import GenerateDrink from "./pages/generatedrink";
import About from "./pages/about";
import Contact from "./pages/contact";
import FavoritesList from "./profile_pages/favoriteslist";
import Trending from "./pages/trending";
import Mixology from "./pages/mixology";
import Following from "./pages/following";

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
       <Route path="/storageadd" element={<StorageAdd />} />
       <Route path="/vault" element={<Vault />} />
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/create" element={<Create />} />
       <Route path="/vault" element={<Vault />} />
       <Route path="/storage" element={<Storage />} />
       <Route path="/storageadd" element={<StorageAdd />} />
       <Route path="/editprofile" element={<EditProfile />} />
       <Route path="/favoriteslist" element={<FavoritesList />} />
       <Route path="/trending" element={<Trending />} />
       <Route path="/mixology" element={<Mixology />} />
       <Route path="/following" element={<Following />} />
     </Routes>
   </div>
 );
};
 
export default App;