import PlacesCards from './PlacesCard'
const places = [
 {id:1, name: 'zoo', location: 'Peepli', image: './placesimage/zoo.jpg'},
 {id:2, name: 'Bus ', location: 'Bus Stand', image: './placesimage/busstand.jpg'},
 {id:3, name: 'kesal', location: 'Kesal', image: './placesimage/kesal.jpg'},
 {id:4, name: 'Station', location: 'Station', image: './placesimage/station.jpg'},
 {id:5, name: 'Divine ', location: 'Divine', image: './placesimage/station.jpg'},
 {id:6, name: 'Iskon ', location: 'Iskon', image: './placesimage/station.jpg'},
 {id:7, name: 'Jyotisar', location: 'Jyotisar', image: './placesimage/station.jpg'},
 {id:8, name: 'Peepli', location: 'Peepli', image: './placesimage/station.jpg'},
 ]

function App() {
  return (
    <div>
      <PlacesCards places={places} />
    </div>
  );
}
export default App;
