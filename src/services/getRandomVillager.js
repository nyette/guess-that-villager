const getRandomVillager = async () => {
  const maxVillagerId = 391;
  const randomVillagerId = Math.round(Math.random() * maxVillagerId);
  const apiUrl = "https://acnhapi.com/v1/villagers/";
  const villagerUrl = apiUrl + randomVillagerId;
  try {
    const res = await fetch(villagerUrl);
    const villager = await res.json();
    return villager;
  } catch (e) {
    console.error(e);
  }
}

export default getRandomVillager;