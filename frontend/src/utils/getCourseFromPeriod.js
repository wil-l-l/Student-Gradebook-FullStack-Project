const getCourseFromPeriod = (courses, period) => {
  return courses.find((courseObj) => courseObj.period === Number(period));
};

export default getCourseFromPeriod;
