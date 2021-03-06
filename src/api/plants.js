import axios from 'axios';
import { getUser } from '../actions/storage';

const fetchPlants = () => {
    return axios.get('https://gardenviewapp.herokuapp.com/plants');
}
const addPlant = (object) => {
    const user = getUser()
    if (user.role !== 'manager') return { error: 'Only managers can add plants' }
    return axios.post('https://gardenviewapp.herokuapp.com/plants', object);
};
const editPlant = (data) => {
    const user = getUser()
    if (!user) return { error: 'no user detected' }
    if (user.role === 'user') return { error: 'Only managers or gardeners can edit plants' }
    console.log('tryna edit here', data.id, data.formData)

    return axios.put(`https://gardenviewapp.herokuapp.com/plants/edit/${data.id}`, data.formData);
}

// pls don't
const killPlant = (id) => {
    const user = getUser()
    if (!user) return { error: 'no user detected' }
    if (user.role === 'user') return { error: 'Only managers can kill plants' }
    console.log('yeehaw we killed it', id)

    return axios.delete(`https://gardenviewapp.herokuapp.com/plants/kill/${id}`, { _id: id });
}
const waterPlant = (id, watered_by) => {
    const user = getUser()
    if (!user) return { error: 'no user detected' }
    if (user.role === 'user') return { error: 'Only managers or gardeners can water plants' }
    return axios.put(`https://gardenviewapp.herokuapp.com/plants/water/${id}`, { watered_by });
}
const fertPlant = (id, formData) => {
    const user = getUser()
    if (!user) return { error: 'no user detected' }
    if (user.role === 'user') return { error: 'Only managers or gardeners can fertilize plants' }
    console.log('yeehaw we fertilized it', id)

    return axios.put(`https://gardenviewapp.herokuapp.com/plants/fert/${id}`, { formData });
}
export { fetchPlants, addPlant, editPlant, killPlant, waterPlant, fertPlant };
