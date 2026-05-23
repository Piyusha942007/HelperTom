import os

from chunking import chunk_text
from loaders import load_txt, load_pdf
from embeddings import embedding_model
from vectorstore import collection

documents_path = "documents"

SUPPORTED_EXTENSIONS = [".txt", ".pdf"]


for filename in os.listdir(documents_path):

    file_path = os.path.join(
        documents_path,
        filename
    )

    extension = os.path.splitext(filename)[1]

    if extension not in SUPPORTED_EXTENSIONS:
        continue

    print(f"\nProcessing: {filename}")

    # ---- LOAD FILE ----
    if extension == ".txt":
        text = load_txt(file_path)

    elif extension == ".pdf":
        text = load_pdf(file_path)

    else:
        continue

    # ---- CHUNK ----
    chunks = chunk_text(text)

    # ---- EMBEDDINGS ----
    embeddings = embedding_model.encode(chunks)

    # ---- STORE ----
    for i, chunk in enumerate(chunks):

        collection.add(
            ids=[f"{filename}_{i}"],
            embeddings=[embeddings[i].tolist()],
            documents=[chunk],
            metadatas=[{
                "source": filename,
                "file_type": extension
            }]
        )

print("\nALL DOCUMENTS INGESTED SUCCESSFULLY 🚀")