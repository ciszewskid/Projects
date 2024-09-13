
# ? This is for if and when I figure out how to properly utilise JSON in python to save and write playlist data
# import json

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

# * Function to add songs to the playlist
def add_song(): # * Commenting out for debugging - song_id, title, artist, genre, year
    try:
        song_id = input("Enter song ID: ")
        if song_id in playlist:
            print(f"Song ID {song_id} already exists in the playlist.")
            return
        # else:
        title = input("Enter song title: ")
        artist = input("Enter artist name: ")
        genre = input("Enter the genre of the song: ")
        year = input("Enter year of song release: ")

        playlist[song_id] = {
            "song_id":song_id,
            "song_title": title,
            "song_artist": artist,
            "song_genre": genre,
            "song_year": year,
        }
        print(f"Added: {title}, by {artist}, [{genre}], [{year}]")

    except Exception as e:
        print(f"An error occurred while adding the song: {e}")

# * Function to view the playlist
def view_playlist():
    try: # ! Exception - error handling
        if not playlist:
            print("The playlist is empty.")
        else:
            for song_id, info in playlist.items():
                print(f"Song ID: {song_id}. Song title: {info['song_title']}, Artist: {info['song_artist']}, Genre: {info['song_genre']}, Year: {info['song_year']}")
    
    except Exception as e: # * Short Alias for "e" for the exception
        print(f"An error occured while viewing the playlist: {e}") # ? Calls the details of the exception


# * Function to update existing songs. Autofills with existing data if left blank
def update_song(): # * Commenting out insides of bracket for debugging - song_id, title = None, artist = None, genre = None, year = None
    try:
        song_id = input("Enter the ID of the song you want to update: ")
        if song_id not in playlist:
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

    except Exception as e:
        print(f"An error occurred while updating the song: {e}")


# * Funciton to delete song from playlist
def delete_song(): # * Commenting out for debugging - song_id
    try:
        song_id = input("Enter the song ID you want to delete: ")
        if song_id not in playlist:
            print(f"Song ID {song_id} not found in the playlist.")
        else:
            del playlist[song_id]
            print(f"Deleted song with the ID of: {song_id}")

    except Exception as e:
        print(f"An error occurred while deleting the song: {e}")


# ! Main menu funciton for complete user interactivity and movement through the whole program
def main_menu():
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
