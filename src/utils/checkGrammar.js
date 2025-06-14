// src/utils/checkGrammar.js
import axios from 'axios';

export const checkGrammar = async (text) => {
  try {
    const response = await axios.post(
      "https://api.languagetoolplus.com/v2/check",
      new URLSearchParams({
        text,
        language: "en-US",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.matches; // contains all grammar/spelling suggestions
  } catch (error) {
    console.error("Grammar check failed:", error);
    return [];
  }
};
