import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001'
})

// Alterar URL após assistir aulas da seção do App/Mobile
