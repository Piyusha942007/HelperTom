def build_prompt(user_query, retrieved_chunks):

    context = ""

    for chunk in retrieved_chunks:
        context += f"""
Source: {chunk['source']}
Content: {chunk['text']}
"""

    prompt = f"""
You are HelperTom, an AI-powered ecommerce customer support assistant.

Your job is to answer customer questions ONLY from the provided company policies and context.

RULES:
- Do NOT make up answers.
- If answer is unavailable, politely say:
  "I could not find this information in the company policies."
- Keep responses professional, concise, and helpful.
- Mention relevant policy source if applicable.

CONTEXT:
{context}

CUSTOMER QUESTION:
{user_query}

ANSWER:
"""

    return prompt