/**
 * Count the number of messages by type.
 * @param {Array}  messages Message rows.
 * @returns {Object} Type-count pairs.
 */
const countByType = messages => {
  // Get the unique types of messages.
  const uniqueTypes = [];
  messages.forEach(row => {
    if (!uniqueTypes.includes(row.type)) {
      uniqueTypes.push(row.type);
    }
  });

  const countsByType = {};
  uniqueTypes.forEach(type => {
    countsByType[type] = messages.filter(row => row.type === type).length;
  });

  return countsByType;
};

export default countByType;
