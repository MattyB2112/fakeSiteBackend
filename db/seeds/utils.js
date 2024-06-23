exports.convertTimestampToDate = ({ userSince, ...otherProperties }) => {
  if (!userSince) {
    return { ...otherProperties };
  } else {
    return { userSince: new Date(userSince), ...otherProperties };
  }
};
