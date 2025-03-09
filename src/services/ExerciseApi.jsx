const API_URL = "https://exercisedb.p.rapidapi.com/exercises";
const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

const fetchExercises = async (limit = 10, offset = 0) => {
  try {
    const response = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch exercises");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

export default fetchExercises;
