import chromadb
from sentence_transformers import SentenceTransformer

# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Connect to ChromaDB
client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_collection("company_policies")


def retrieve_context(query, top_k=3):
    # Convert query into embedding
    query_embedding = embedding_model.encode(query).tolist()

    # Search in ChromaDB
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    retrieved_chunks = []

    for doc, meta, distance in zip(documents, metadatas, distances):

        # Lower distance = better match
        if distance > 1.2:
            continue

        retrieved_chunks.append({
            "text": doc,
            "source": meta["source"],
            "score": round(distance, 3)
        })

    return retrieved_chunks