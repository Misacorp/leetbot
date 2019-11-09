import uuid from 'uuid/v4';
import Server from '../../classes/Server';

const servers = [
  {
    id: uuid(),
    name: 'Sepon Serveri',
    iconUrl: 'https://sepon.serveri.com/image.jpg',
  },
  {
    id: uuid(),
    name: 'Paulan Palvelin',
    iconUrl: 'https://paulan.palvelin.fi/image.jpg',
  },
];

/**
 * Creates a mock server object.
 * @returns {Server} New server object.
 */
const createMockServer = () => {
  const randomIndex = Math.floor(Math.random() * servers.length);
  const s = servers[randomIndex];
  return new Server(s.id, s.name, s.iconUrl);
};

export default createMockServer;
