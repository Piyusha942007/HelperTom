import os

from chunking import chunk_text
from loaders import load_txt, load_pdf
from embeddings import embedding_model
from vectorstore import collection

documents_path = "documents"

SUPPORTED_EXTENSIONS = [".txt", ".pdf"]


def process_document(file_path):
    """
    Load, chunk, embed, and store a document into ChromaDB.
    """
    filename = os.path.basename(file_path)
    extension = os.path.splitext(filename)[1].lower()

    if extension not in SUPPORTED_EXTENSIONS:
        print(f"Unsupported extension: {extension}")
        return False

    print(f"\nProcessing: {filename}")

    # ---- LOAD FILE ----
    if extension == ".txt":
        text = load_txt(file_path)
    elif extension == ".pdf":
        text = load_pdf(file_path)
    else:
        print(f"Error loading {filename}: Extension not handled")
        return False

    # ---- CHUNK ----
    chunks = chunk_text(text)
    if not chunks:
        print(f"No chunks extracted from {filename}")
        return False

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
    print(f"Successfully ingested {filename} into vector store [SUCCESS]")
    return True


if __name__ == "__main__":
    if not os.path.exists(documents_path):
        os.makedirs(documents_path)
        
    for filename in os.listdir(documents_path):
        file_path = os.path.join(
            documents_path,
            filename
        )
        process_document(file_path)

    print("\nALL DOCUMENTS INGESTED SUCCESSFULLY [SUCCESS]")