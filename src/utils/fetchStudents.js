const BASE_URL = "http://localhost:3000/students";

const fetchStudents = async (options = {}, pathParam = "", abortController) => {
  const studentsJSON = await fetch(BASE_URL + pathParam, {
    ...options,
    signal: abortController.signal,
  });
  if (!studentsJSON.ok) throw Error("Could not fetch students json data.");
  const studentsArr = await studentsJSON.json();
  return studentsArr;
};

export default fetchStudents;
