""" Some movies had \r or \n in the overview, which needs removing """

with open('result_data.tsv', 'r', encoding='UTF-8') as file:
    with open('result_final.tsv', 'w+', encoding='UTF-8') as f2:
        data = ''
        for line in file:
            if line[:2] == 'tt':
                if data != '':
                    f2.write(data)
                    data = ''
                data += line
            else:
                if line[0] == '\n' or line[0] == '\r':
                    line = line[1:]
                data = data.replace('\n', '')
                data = data.replace('\r', '')
                data += line
