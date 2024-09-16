
# ? This is for if and when I figure out how to properly utilise JSON in python to save and write playlist data
import json
import os

# * Starting with a barebones playlist dictionary that will later be added onto
playlist = {
    "1": {"song_id":"1",
    "song_title": "Dance",
    "song_artist": "MJ",
    "song_genre": "Pop",
    "song_year": "2022",},

    "2": {"song_id": "2",
    "song_title": "Who Are You",
    "song_artist": "Borislav Slavov",
    "song_genre": "Fantasy",
    "song_year": "2023",},

    "3": {"song_id": "3",
    "song_title": "Down the Line",
    "song_artist": "Beach Fossils",
    "song_genre": "Indie Pop",
    "song_year": "2017",},
    }


# ? I have to get the directory origin of the python script
script_dir = os.path.dirname(os.path.abspath(__file__))

# ? Attempting to make save and load funcitons for saving data to JSON file
def save_playlist(filename="playlist.json"):
    try:
        # ! Constructs full path for the JSON file in the python script's directory
        filepath = os.path.join(script_dir, filename)
        with open(filepath, "w") as file: # ! Opens file in WRITE ("W") mode. If that doesn't exist, it will be created.
            json.dump(playlist, file, indent=4) # ! Converts the dictionary to a JSON String and writes it to file. The indent = 4 makes the JSON human-readable with indentation
        print("Playlist saved successfully!")
    except Exception as e:
        print(f"An error occurred while saving the playlist: {e}")


# ? Load function now
def load_playlist(filename="playlist.json"):
    global playlist #! Using "Global" to modify the global "playlist" variable inside this funciton - Global variables can be used by everyone. Both inside and out the function of origin
    try:
        # ! Constructs full path for the JSON file in the python script's directory
        filepath = os.path.join(script_dir, filename)
        with open(filepath, "r") as file: #! Opens file in READ ("r") mode
            playlist = json.load(file)
        print("Playlist Loaded successfully!")
    except FileNotFoundError: #! Exception error for when the file is not found / doesnt exist
        print("No playlist file found. Starting with an empty playlist.")
        playlist = {}
    except Exception as e:
        print(f"An error occurred while loading the playlist: {e}")
        playlist = {}


# * Function to add songs to the playlist
def add_song(): # * Commenting out for debugging - song_id, title, artist, genre, year
    try:
        song_id = input("Enter song ID: ")
        if song_id in playlist:
            print(f"Song ID {song_id} already exists in the playlist.")
            return
        
        # ? Prompts for user input for the specified data
        title = input("Enter song title: ")
        artist = input("Enter artist name: ")
        genre = input("Enter the genre of the song: ")
        year = input("Enter year of song release: ")

        # ? Adds the new song to the playlist dictionary with the ID as the key
        playlist[song_id] = {
            "song_id":song_id,
            "song_title": title,
            "song_artist": artist,
            "song_genre": genre,
            "song_year": year,
        }
        print(f"Added: {title}, by {artist}, [{genre}], [{year}]")
        save_playlist()

    except Exception as e:
        print(f"An error occurred while adding the song: {e}")

# * Function to view the playlist
def view_playlist():
    try: # ! Exception - error handling
        if not playlist: # ! Checks if the playlist is empty
            print("The playlist is empty.")
        else:
            for song_id, info in playlist.items(): #! Iterate over each son in the playlist
                print(f"Song ID: {song_id}. Song title: {info['song_title']}, Artist: {info['song_artist']}, Genre: {info['song_genre']}, Year: {info['song_year']}")
    
    except Exception as e: # * Short Alias for "e" for the exception
        print(f"An error occured while viewing the playlist: {e}") # ? Calls the details of the exception


# * Function to update existing songs. Autofills with existing data if left blank
def update_song(): # * Commenting out insides of bracket for debugging - song_id, title = None, artist = None, genre = None, year = None
    try:
        song_id = input("Enter the ID of the song you want to update: ")
        if song_id not in playlist: #! If song ID not found, inform user and return
            print(f"Song ID {song_id} not found in the playlist.")
            return
        
        title = input(f"Enter new song title (leave blank if you want to keep {playlist[song_id]['song_title']}): ") or None
        artist = input(f"Enter new artist name (leave blank if you want to keep {playlist[song_id]['song_artist']}): ") or None
        genre = input(f"Enter new genre of the song (leave blank if you want to keep {playlist[song_id]['song_genre']}): ") or None
        year = input(f"Enter new year of song release (leave blank if you want to keep {playlist[song_id]['song_year']}): ") or None


        # ? Get existing song data
        song = playlist[song_id]

        # ? Updates only the fields that have been filled and provided, leaving the others unchanged
        song["song_title"] = title if title else song["song_title"]
        song["song_artist"] = artist if artist else song["song_artist"]
        song["song_genre"] = genre if genre else song["song_genre"]
        song["song_year"] = year if year else song["song_year"]

        print(f"Updated {song["song_title"]}: Artist: {song['song_artist']}, Genre: {song['song_genre']}, Year: {song['song_year']}")
        save_playlist()

    except Exception as e:
        print(f"An error occurred while updating the song: {e}")


# * Funciton to delete song from playlist
def delete_song(): # * Commenting out for debugging - song_id
    try:
        # ! Prompt user for ID of the song they want to delete
        song_id = input("Enter the song ID you want to delete: ")
        # ! Checks if song ID exists in the playlist
        if song_id not in playlist: #! If not found, prints as such to the user
            print(f"Song ID {song_id} not found in the playlist.")
        else:
            del playlist[song_id] #! If song ID exists, it gets removed from the playlist using the "del" keyword
            print(f"Deleted song with the ID of: {song_id}")
            save_playlist()

    except Exception as e:
        print(f"An error occurred while deleting the song: {e}")


# ! Main menu funciton for complete user interactivity and movement through the whole program
def main_menu():
    # ! Loads playlist file from previous additions and deletions when the program starts
    load_playlist()

    # ! Starts an infinite while loop to keep the menu active until the user chooses to exit out of the program.
    while True:
        print("\nHello, welcome to this playlist program. Choose from the options below:")
        print("1. View the playlist.")
        print("2. Add a song and artist info.")
        print("3. Update a song and artist info.")
        print("4. Delete a song and artist info.")
        print("5. Exit.")

        user_choice = input("Navigate using the above options (1 - 5): ")

        if user_choice == "1":
            view_playlist()
        elif user_choice == "2":
            add_song()
        elif user_choice == "3":
            update_song()
        elif user_choice == "4":
            delete_song()
        elif user_choice == "5":
            print("Exiting program. Goodbye!")
            break
        else:
            print("Invalid input, please choose a number between 1 and 5.")

# ? Running the whole program now
main_menu()


# ! Will have to look into saving, storing and loading the inputted data by the user. Local storage in JS. Need to find the equivalent in Python
