def build_prompt(user_query, retrieved_chunks):

    context = ""

    for chunk in retrieved_chunks:

        context += f"""
SOURCE: {chunk['source']}

CONTENT:
{chunk['text']}

----------------
"""

    prompt = f"""
You are HelperTom, an AI ecommerce customer support assistant.

You must answer ONLY using the provided context.

RULES:
- Do not hallucinate.
- Do not invent policies.
- If information is unavailable, say:
"I could not find this information in the company policies."
- Keep answers concise and professional.
- Mention the relevant source document when possible.

CONTEXT:
{context}

CUSTOMER QUESTION:
{user_query}

FINAL ANSWER:
"""

    return prompt