import {React,useEffect,useState} from 'react';
import Navbar from './Navbar';
import About from './About';
import Contact from './Contact';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import ViewPools from './ViewPools';
import CrudDetails from './CrudDetails';
import AddContact from './AddContact';
const App = () => {
  const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts'));
        if (storedContacts) {
          setContacts(storedContacts);
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }, [contacts]);
    
      const addContact = (contact) => {
        setContacts([...contacts, contact]);
      };
    
      const deleteContact = (id) => {
        setContacts(contacts.filter((c) => c.id !== id));
      };

      const updateContact = (updatedContact) => {
        setContacts(
          contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
        );
      };
    
      const selectContact = (id) => {
        const selected = contacts.find((c) => c.id === id);
        setSelectedContact(selected);
      };
  return (
    <>   
    <BrowserRouter>
    <Navbar/>
      <Routes>  
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/addPools" element={<AddContact  addContact={addContact} />} />
      <Route exact path="/about" element={<About/>} />
      <Route exact path="/viewpools" element={<ViewPools/>} />
      <Route exact path="/PoolMemberDetails/:id" render={(props) => <CrudDetails {...props} place={props.match.params.id}  />} element={<CrudDetails />} />    
        <Route exact path="/contact" element={<Contact/>} />
      </Routes>      
      </BrowserRouter>
    </>
  );
};

export default App;
