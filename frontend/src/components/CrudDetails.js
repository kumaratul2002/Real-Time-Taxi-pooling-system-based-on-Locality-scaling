
import AddContact from './AddContact';
import ContactList from './ContactList';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Mapkkr from './map places/Mapkkr';
import MapBus from './map places/MapBus';
import MapDivine from './map places/MapDivine';
import MapIskon from './map places/MapIskon';
import MapJyotisar from './map places/MapJyotisar';
import Mapkesal from './map places/Mapkesal';
import MapPeepli from './map places/MapPeepli';
import MapStation from './map places/MapStation';
import Mapzoo from './map places/Mapzoo';
import MapReturn from './MapReturn';
const CrudDetails = () => {
  
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
      const maps = {
        "kkr": <Mapkkr />,
        "Bus": <MapBus />,
        "Divine": <MapDivine />,
        "Iskon": <MapIskon />,
        "Jyotisar": <MapJyotisar />,
        "kesal": <Mapkesal />,
        "Peepli": <MapPeepli />,
        "Station": <MapStation />,
        "zoo": <Mapzoo />
        }

      // const Map = (props) => {
      //   if (props.id === 'kkr') {
      //     return <Mapkkr />
      //   } else if (props.id === 'Bus') {
      //     return <MapBus />
      //   } else if (props.id === 'Divine') {
      //     return <MapDivine />
      //   } else if (props.id === 'Iskon') {
      //     return <MapIskon />
      //   } else if (props.id === 'Jyotisar') {
      //     return <MapJyotisar />
      //   } else if (props.id === 'kesal') {
      //     return <Mapkesal />
      //   } else if (props.id === 'Peepli') {
      //     return <MapPeepli />
      //   } else if (props.id === 'Station') {
      //     return <MapStation />
      //   } else if (props.id === 'zoo') {
      //     return <Mapzoo />
      //   } else {
      //     return <div>Map not found: {props.id}</div>
      //   }
      // }
      let {id} = useParams();  //to retain last path name in address
  return (
    <>
    
    <div>
    {maps[id]}
    
    </div>
    {/* <Map id={id}/> */}
      <ContactList  id={id}
        contacts={contacts}
        deleteContact={deleteContact}
        selectContact={selectContact}
      />
      {/* <AddContact dest={id} addContact={addContact} /> */}
    </>
  )
}

export default CrudDetails
