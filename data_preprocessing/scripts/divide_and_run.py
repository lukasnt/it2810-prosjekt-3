import sys
from tqdm import tqdm
import subprocess
import os

""" Takes a large tsv file, splits it into many smaller ones, runs tmdb.py on every file before merging results together """
""" By dividing the work, you can do lots of api calls at the same time """

processes_num = 40
from_file = 'data.tsv'
to_file = 'result_data.tsv'


def get_new_field_names(originalfile):
    with open(originalfile, 'r', encoding='UTF-8') as file:
        f = file.readline()[:-1].split('\t')
        f.extend(['posterPath', 'voteAverage', 'voteCount', 'originalLanguage', 'overview'])
        file.close()
    return f


def generate_smaller_files(fromfile, n_files):
    with open(fromfile, 'r', encoding='UTF-8') as file:
        files = [open('generated_file_%d.tsv' % i, 'w', encoding='UTF-8') for i in range(n_files)]
        for i, line in enumerate(tqdm(file)):
            files[i % n_files].write(line)
        for f in files:
            f.close()
    return ['generated_file_%d.tsv' % i for i in range(n_files)]


def run_and_get_processes(files):
    processes = []
    for file in files:
        p = subprocess.Popen([sys.executable, 'tmdb.py', file, 'new_' + file],
                             creationflags=subprocess.CREATE_NEW_CONSOLE)
        processes.append(p)

    return processes, ['new_' + file for file in files]


def wait_for_processes_to_finish(processes):
    for p in processes:
        p.wait()


def combine_files(fromfiles, tofile, fields=None):
    with open(tofile, 'w+', encoding='UTF-8') as file:
        if fields:
            file.write('\t'.join(fields) + '\n')
        for fromfile in fromfiles:
            with open(fromfile, 'r', encoding='UTF-8') as f:
                file.write(f.read())


def delete_generated_files(files):
    for file in files:
        os.remove(file)


fields = get_new_field_names(from_file)

files = generate_smaller_files(from_file, processes_num)

processes, new_files = run_and_get_processes(files)

wait_for_processes_to_finish(processes)

combine_files(new_files, to_file, fields=fields)

delete_generated_files(files)
delete_generated_files(new_files)
