import process from "process";

const API_URL = "https://exercisedb.p.rapidapi.com/exercises";
const API_KEY = process.env.VITE_RAPID_API_KEY || "mocked-api-key";



export const fetchExercises = async (limit = 100, offset = 0) => {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    if (response.ok) {
      return await response.json();
    }
    throw new Error("Failed to fetch exercises");
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

export const fetchTargets = async () => {
  try {
    const response = await fetch(`${API_URL}/targetList`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Failed to fetch target data");
  } catch (error) {
    console.error("Error fetching target types:", error);
    return [];
  }
};
