// interviewPrompts.js

export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question:
  - Keep the answer **short, clear, and beginner-friendly**.
  - If a code example is needed, show only a **very small snippet** (not full apps).
  - Avoid long paragraphs or over-explaining.
  - Use simple language.

Output Format:
Return a pure JSON array like:
[
  {
    "question": "Question here?",
    "answer": "Answer here."
  }
]

Important: Do NOT add any extra text. Only return valid JSON.
`;


export const conceptExplainPrompt = (question) => `
You are an AI trained to explain interview concepts in a beginner-friendly way.

Task:
- Explain the following interview question clearly and concisely.
- Question: "${question}"
- Use simple language.
- If a code example helps, give an example program.
- At the end, provide a short and clear title that summarizes the concept.

Output Format:
Return the result as a valid JSON object:
{
  "title": "Short title here",
  "explanation": "Concise explanation here."
}

Important: Do NOT add any text outside the JSON. Only return valid JSON.
`;