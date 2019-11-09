import uuid from 'uuid/v4';
import User from '../../classes/User';

const users = [
  {
    id: uuid(),
    name: 'Seppo Taalasmaa',
    avatarUrl: 'https://seppo.taalasmaa.jpg',
  },
  {
    id: uuid(),
    name: 'Veikka Vätys',
    avatarUrl: 'https://veikka.vatys.jpg',
  },
  {
    id: uuid(),
    name: 'Anja Aivastaja',
    avatarUrl: 'https://anja.aivastaja.jpg',
  },
];

/**
 * Creates a mock User object.
 * @returns {User} User object.
 */
const createMockUser = () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  const u = users[randomIndex];
  return new User(u.id, u.name, u.avatarUrl);
};

export default createMockUser;
