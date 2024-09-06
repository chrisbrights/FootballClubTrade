const ethers = require('ethers')
require('dotenv').config();
const contractABI = require('./abi/FootballClubTrade.json')

let CONTRACT_ADDRESS = "0x825377654B09B1A7337327d50361258D002C3Da7"
async function main() {
    const provider = new ethers. providers.JsonRpcProvider(process.env.API_URL)
    const signer = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

    tradeContract =  new ethers.Contract(
      CONTRACT_ADDRESS,
      contractABI.abi,
      signer,
    );

    
  
  // Call the function with appropriate parameters
  
    let clubs = await tradeContract.getAllClubs()
    
}
async function registerClub(name, abbr) {
  try {
      const tx = await tradeContract.registerClub(name, abbr);
      await tx.wait();  // Wait for the transaction to be mined
      console.log(`Club ${name} registered successfully with abbreviation ${abbr}`);
  } catch (error) {
      console.error('Error registering club:', error);
  }
}
async function setvelocity(){
  try{
    const tx=await tradeContract.setVelocity();
    await tx.wait();
  }
  catch(error){
    console.error('error updating velocity',error);
  }
}
async function setClubStockPrice(clubId,newstockprice){
  try{
    const tx=await tradeContract.setClubStockPrice(clubId,newstockprice);
    await tx.wait();
  }
  catch(error){
    console.error('error is generated in setting clubs stock price',error)
  }
}
async function getClubStockPrice(clubId){
  try{
    const tx=await tradeContract.getClubStockPrice(clubId,newstockprice);
    await tx.wait();
  }
  catch(error){
    console.error('error is generated in getting clubs stock price',error)
  }
}
async function registerfuturedate(date){
  try{
    const tx=await tradeContract.registerFutureDate(date);
    await tx.wait();
  }
  catch(error){
    console.error('error is generated',error)
  }
}
async function setacceptdeadline(date){
  try{
    const tx=await tradeContract.setAcceptDeadline(date);
    await tx.wait();
  }
  catch(error){
    console.error('error is generated',error)
  }
}
async function setOpenInterest(){
  try{
    const tx=await tradeContract.setOpenInterest(date);
    await tx.wait();
  }
  catch(error){
    console.error('error is generated',error)
  }
}
async function getOpenInterest(clubId){
  try{
    const tx=await tradeContract.getOpenInterest(clubId);
    await tx.wait();
  }
  catch(error){
    console.error('error is generated',error)
  }
}




main()

const axios = require('axios');

// API credentials and parameters
const headers = {
    'x-rapidapi-key': 'dfb18ed2a245ab2f7abe23d36ba62e11',
    'x-rapidapi-host': 'v3.football.api-sports.io'
};
const epl_id = 39;
const season = 2022;
const team_id = 35;

const url = "https://v3.football.api-sports.io/standings";
const params = {
    league: epl_id,
    season: season,
    team: team_id
};



// Function to fetch team data
async function fetchTeamData(team) {
    try {
        const response = await axios.get(url, { headers: headers, params: params });
        const teamData = response.data.response[0].league.standings[0][0].all;

        const MW = teamData.win;
        const MD = teamData.draw;
        const ML = teamData.lose;
        const GS = teamData.goals.for;
        const GC = teamData.goals.against;
        // 1.03*mw * 1.00md * 0.97ml * 1.005gs * 0.995gc * 1.005cs
        const stockprice=(100+1.03*MW+MD-0.97*ML+1.005*GS-0.995*GC)*100
        console.log(stockprice)
        setClubStockPrice(team,stockprice)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function
fetchTeamData(35);
