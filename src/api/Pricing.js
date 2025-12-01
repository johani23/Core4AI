import axios from "axios";

const API = "http://localhost:8000/pricing";

export const calcEVC = (payload) => axios.post(`${API}/evc/calculate`, payload);
export const calcElasticity = (payload) => axios.post(`${API}/elasticity/calculate`, payload);
export const calcMonadic = (payload) => axios.post(`${API}/monadic/curve`, payload);
export const calcBreakeven = (payload) => axios.post(`${API}/breakeven/calculate`, payload);
