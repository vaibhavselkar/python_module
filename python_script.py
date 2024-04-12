from textblob import TextBlob

def provide_feedback(writing_response):
    # Create a TextBlob object
    blob = TextBlob(writing_response)

    # Perform spell checking
    mistakes = blob.correct()

    return mistakes

if __name__ == "__main__":
    import sys
    
    # Get the writing response from command-line arguments
    writing_response = sys.argv[1]
    
    # Provide feedback and print it
    feedback = provide_feedback(writing_response)
    print("Corrected text:")
    print(feedback)
