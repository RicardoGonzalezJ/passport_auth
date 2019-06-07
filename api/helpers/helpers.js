/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const dbcon = require('../../db/dbcon');

exports.isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/users/login');
  } else {
    return next();
  }
};

exports.deleteSession = (sessionID, callback) => {
  const query = 'DELETE FROM session WHERE sid = $1';
  const value = [sessionID];
  dbcon.query(query, value, callback);
};

/*
 * ******************LOCAL FUNCTION TO CHECK IF AN OBJECT IS EMPTY*********************************
 */
exports.isEmptyObject = (obj) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};
