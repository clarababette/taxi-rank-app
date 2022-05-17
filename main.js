import './style.scss';
import routes from './taxi-rank.js';
import Alpine from 'alpinejs'
 
window.Alpine = Alpine

Alpine.data('taxiRank', routes)
 
Alpine.start()


