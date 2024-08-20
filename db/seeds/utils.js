exports.convertTimestampToDateUsers = ({ userSince, ...otherProperties }) => {
  if (!userSince) {
    return { ...otherProperties };
  } else {
    return { userSince: new Date(userSince), ...otherProperties };
  }
};

exports.convertTimestampToDateProducts = ({
  dateAdded,
  ...otherProperties
}) => {
  if (!dateAdded) {
    return { ...otherProperties };
  } else {
    return { dateAdded: new Date(dateAdded), ...otherProperties };
  }
};
