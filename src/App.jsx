import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from "axios";

const API_KEY =  import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [picture, setPicture] = useState(null);
  const [breedGroup, setBreedGroup] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [name, setName] = useState("");
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  

  console.log("heeeeeelllllllllllp");

  /*

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios.get("https://api.thedogapi.com/v1/images/search");
      console.log(response);
      setItem(response);
    }

  });

  
  */
  const fetchData = async () => {
    const response = await axios.get("https://api.thedogapi.com/v1/images/search?has_breeds=1&api_key=" + API_KEY);
    console.log(response.data);
    setPicture(response.data[0].url);
    setBreedGroup(response.data[0].breeds[0].breed_group);
    setWeight(response.data[0].breeds[0].weight.imperial + " pounds");
    setHeight(response.data[0].breeds[0].height.imperial + " inches");
    setLifeSpan(response.data[0].breeds[0].life_span);
    setName(response.data[0].breeds[0].name);
    
    if(banList.includes(breedGroup) || banList.includes(weight) || banList.includes(height) || banList.includes(lifeSpan) || banList.includes(name)) {
      /*fetchData();*/
    }

    setHistory([...history, picture]);
  }

  const addBannedItem = (item) => {

    if(!banList.includes(item)) {
      setBanList([...banList, item]);
    }

    else {
      alert("you already have this item banned");
    }

  }


  const removeBannedItem = (item) => {
    setBanList(banList.filter((value) => value != item));

  }




   

  /*fetch(`https://rawg.io/api/games?token&key=${API_KEY}`)
  .then(res => res.json())
  .then(data => data.results.map(gameData => console.log(gameData)))
  .catch(error => console.error('Error:', error));

*/


  return (
    <div className = "whole-page">
      
      <h1 className = "title">Dog Discovery</h1>
      <p className = "description">Discover all kinds of dogs!</p>
      <div className = "history-panel">
        <h2 className = "history-panel-name">History</h2>
        <p>What you've seen already</p>
        <div className = "history-container">
          {history && history.length > 0 ? (
            history.map((picture, index) => (
              <li className = "history-list" key = {index}>
                {picture && <img className = "history-list-picture" src = {picture} width = "100" height = "100" />}
              </li>
            ))

          ) : (

            <div>

            </div>

            

          )}

        </div>
      </div>
      <div className = "side-bar">
            <h2 className = "side-bar-name">Ban List</h2>
            <p>Select an attribute in your listings to ban it.  Additionally click an element in the ban list to remove it from the ban list.</p>
            <div className = "attribute-container">
                {banList && banList.length > 0 ? (
                    banList.map((attribute, index) => (
                        <li className = "ban-list" key = {index}>
                            <button className = "ban-list-attribute" onClick = {() => removeBannedItem(attribute)}>{attribute}</button>
                        </li>
                    ))


                ) : (

                    <div>
                        
                    </div>

                )}

            </div>

            
      </div>
      <div className = "dog">
        <div className = "buttons">
          
              {breedGroup && <button className = "breed-group-name" onClick = {() => addBannedItem(breedGroup)}>{breedGroup}</button>}
              {weight && <button className = "weight" onClick = {() => addBannedItem(weight)}>{weight}</button>}
              {height && <button className = "height" onClick = {() => addBannedItem(height)}>{height} </button>}
              {lifeSpan && <button className = "life-span" onClick = {() => addBannedItem(lifeSpan)}>{lifeSpan}</button>}
              {name && <button className = "name" onClick = {() => addBannedItem(name)}>{name}</button>}

        </div>
              
        {picture && <img className = "dog-picture" width = "250" height = "250" src = {picture} />}
      </div>
      <p className = "generate-container"><button className = "generate" onClick = {fetchData}>Discover!</button></p>
      
      

    </div>
  )
}

export default App
