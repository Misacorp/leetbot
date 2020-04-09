/**
 * Extracts and returns url a request was sent to.
 * The goal is to understand where the API is running at.
 * @param {object} req Express request object
 * @returns {string} Location where the API is running at.
 */
const getPublicUrl = req => {
  return `${req.protocol}://${req.headers.host}`;
};

export default getPublicUrl;
