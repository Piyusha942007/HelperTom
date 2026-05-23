from embeddings import embedding_model
from vectorstore import collection


def retrieve_context(query, top_k=5):

    query_embedding = embedding_model.encode(
        query
    ).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    if not results["documents"]:
        return []

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    retrieved_chunks = []

    for doc, meta, distance in zip(
        documents,
        metadatas,
        distances
    ):

        if distance > 1.3:
            continue

        retrieved_chunks.append({
            "text": doc,
            "source": meta["source"],
            "score": round(distance, 3)
        })

    return retrieved_chunks