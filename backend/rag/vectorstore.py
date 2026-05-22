from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb

# Load text file
file_path = "documents/AUTOMOTIVE ACCESSORIES.txt"

with open(file_path, "r", encoding="utf-8") as file:
    text = file.read()

# Chunking
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

chunks = text_splitter.split_text(text)

# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Create embeddings
embeddings = embedding_model.encode(chunks)

# Create ChromaDB client
client = chromadb.PersistentClient(path="./chroma_db")

# Create collection
collection = client.create_collection(name="helpertom_knowledge")

# Store chunks + embeddings
for i, chunk in enumerate(chunks):
    collection.add(
        documents=[chunk],
        embeddings=[embeddings[i].tolist()],
        ids=[f"id_{i}"]
    )

print("Chunks stored successfully in ChromaDB!")