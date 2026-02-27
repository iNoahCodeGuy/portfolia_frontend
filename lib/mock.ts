const MOCK_RESPONSES: Record<string, string> = {
  "Learn more about Noah":
    "Inside Sales Advisor at Tesla Las Vegas since November 2024. Plaid Club, top 10% performer. Before that: Logistics Account Executive at TQL — freight operations, carrier relationships, tight deadlines. Before that: Real Estate Agent at Signature Real Estate Group. Foundation is a Biology degree from UNLV with biostatistics and experimental design. The career path makes more sense when you hear the through-line — what's bringing you to the portfolio?",
  "See what Noah has built":
    "Python, SQL, Tableau, Git. The interesting part is where the quantitative foundation comes from — not a CS program, but a Biology degree from UNLV. Biostatistics, hypothesis testing, experimental design. The projects are where it shows: a 22-node RAG pipeline (you're using it), a logistic regression model that hit 94.75% accuracy, a statistical analysis app in Streamlit, and a lead response heatmap. What's bringing you here — hiring, or recon?",
  "Just looking around":
    "No agenda required. I know about Noah's projects, his career background, his technical stack, and there's an MMA coaching story that's better than you'd expect. Ask whatever you want.",
  "Confess a crush":
    "Didn't expect anyone to actually pick this one. Respect the commitment though. I can let Noah know someone came through with intentions. Two options: stay anonymous and I tell him he's got a secret admirer, or reveal yourself — drop a name and a way to reach you. What's it gonna be?",
};

const DEFAULT_RESPONSE =
  "That's a solid question. I'm running on mock data right now, so I can't give you the real answer yet — but once the backend is wired up, this is where Portfolia's actual personality kicks in. Try one of the menu options to see what a real response looks like.";

export async function getMockResponse(userMessage: string): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_RESPONSES[userMessage] ?? DEFAULT_RESPONSE;
}
