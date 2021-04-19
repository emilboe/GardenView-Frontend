import axios from 'axios';
import { getUser } from '../helpers/storage';



const fetchPlants = () => {
    return axios.get('/plants');
}
const addPlant = (object) => {
    const user = getUser()
    if (user.role !== 'manager') return { error: 'Only managers can add plants' }
    return axios.post('/plants', object);
};
const killPlant = (id) => {
    const user = getUser()
    if (user.role !== 'manager') return { error: 'Only managers can kill plants' }
    console.log('yeehaw we killed it', id)
    // return id
    return axios.get(`/plants/kill/${id}`, { _id: id });
}
export { fetchPlants, addPlant, killPlant };