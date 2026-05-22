import os
import chromadb

from sentence_transformers import SentenceTransformer
from chunking import chunk_text

# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Persistent ChromaDB
client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="company_policies"
)

# Documents folder
documents_path = "documents"

# Read ALL txt files
for filename in os.listdir(documents_path):

    if filename.endswith(".txt"):

        file_path = os.path.join(documents_path, filename)

        print(f"\nProcessing: {filename}")

        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()

        # Chunk text
        chunks = chunk_text(text)

        for i, chunk in enumerate(chunks):

            embedding = embedding_model.encode(chunk).tolist()

            collection.add(
                ids=[f"{filename}_{i}"],
                embeddings=[embedding],
                documents=[chunk],
                metadatas=[{
                    "source": filename
                }]
            )

print("\nALL DOCUMENTS INGESTED SUCCESSFULLY")