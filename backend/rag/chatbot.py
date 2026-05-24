from retrieval import retrieve_context
from llm.prompts import build_prompt
from llm.router import generate_llm_response


def generate_response(user_query):

    # Retrieve relevant chunks
    retrieved_chunks = retrieve_context(user_query)

    if not retrieved_chunks:
        return "I could not find relevant information in company policies."

    print("\nRETRIEVED CHUNKS:\n")

    for chunk in retrieved_chunks:
        print(chunk)
        print("\n-----------------\n")

    # Build prompt
    prompt = build_prompt(user_query, retrieved_chunks)

    # Generate AI response
    response = generate_llm_response(prompt)

    return response


def get_ai_response(user_query):
    """
    Retrieve context and generate response, returning both the answer and the sources.
    """
    retrieved_chunks = retrieve_context(user_query)
    
    if not retrieved_chunks:
        return {
            "response": "I could not find relevant information in company policies.",
            "sources": []
        }
        
    prompt = build_prompt(user_query, retrieved_chunks)
    response = generate_llm_response(prompt)
    
    return {
        "response": response,
        "sources": retrieved_chunks
    }


if __name__ == "__main__":

    user_query = input("Ask your question: ")

    answer = generate_response(user_query)

    print("\nAI RESPONSE:\n")
    print(answer)