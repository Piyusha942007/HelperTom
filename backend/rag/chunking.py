from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_text(text):

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    chunks = text_splitter.split_text(text)

    return chunks