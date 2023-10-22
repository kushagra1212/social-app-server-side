module.exports.getPostScore = (createdAt, comments, profilepic, likes) => {
  const dateDiff = new Date() - new Date(createdAt);
  const dateDiffInHours = dateDiff / 1000 / 60 / 60;
  const hasProfilePicture = profilepic ? 1 : 0;
  const score =
    (comments * 3 + hasProfilePicture * 5 + likes * 2) / dateDiffInHours;
  return score;
};
