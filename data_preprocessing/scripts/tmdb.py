import requests
from tqdm import tqdm
import csv
import sys

""" Takes a tsv file with imdb movie info, sends an api request to tmdb, creates a combined tsv with data merged on common id """


def movies_generator(filename):
    with open(filename, 'r', encoding='UTF-8') as file:
        csvreader = csv.reader(file, delimiter="\t")
        for row in csvreader:
            if row[1] == 'movie':
                data = requests.get(f'https://api.themoviedb.org/3/movie/{row[0]}?api_key=ENTER_API_KEY_HERE').json()
                try:
                    poster_path = 'https://image.tmdb.org/t/p/original' + data['poster_path']
                    vote_average = str(data['vote_average'])
                    vote_count = str(data['vote_count'])
                    original_language = data['original_language']
                    overview = data['overview']
                    if poster_path:
                        row.extend([poster_path, vote_average, vote_count, original_language, overview])
                        yield row
                except:
                    pass


def generate_new_file(fromfile, tofile):
    with open(tofile, 'w+', encoding='UTF-8') as file:
        for movie in tqdm(movies_generator(fromfile)):
            file.write('\t'.join(movie) + '\n')
        file.close()


_, fromfile, tofile = sys.argv

generate_new_file(fromfile, tofile)
