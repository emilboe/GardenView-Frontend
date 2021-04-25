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
const editPlant = (data) => {
    const user = getUser()
    if(!user) return {error: 'no user detected'}
    if (user.role == 'user') return { error: 'Only managers can edit plants' }
    console.log('tryna edit here', data.id, data.formData)
    // return {message: 'cool'}
    // return id
    return axios.put(`/plants/edit/${data.id}`, data.formData);
}
const killPlant = (id) => {
    const user = getUser()
    if(!user) return {error: 'no user detected'}
    if (user.role == 'user') return { error: 'Only managers can kill plants' }
    console.log('yeehaw we killed it', id)
    // return id
    return axios.delete(`/plants/kill/${id}`, { _id: id });
}
const waterPlant = (id, watered_by) => {
    const user = getUser()
    if(!user) return {error: 'no user detected'}
    if (user.role == 'user') return { error: 'Only managers can water plants' }
    console.log('we bout to water', id)
    // return id
    return axios.put(`/plants/water/${id}`, { watered_by });
}
const fertPlant = (id, formData) => {
    const user = getUser()
    if(!user) return {error: 'no user detected'}
    if (user.role == 'user') return { error: 'Only managers can fertilize plants' }
    console.log('yeehaw we fertilized it', id)
    // return id
    return axios.put(`/plants/fert/${id}`, { formData });
}
export { fetchPlants, addPlant, editPlant, killPlant, waterPlant, fertPlant };