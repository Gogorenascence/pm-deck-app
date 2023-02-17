# import this



# dict = {"list":[1,2,3,4,5,6,7]}
# dict2 = {"dict": dict}

# print(dict2)


def one_away(word, edit):
    count = 0
    word_listed = []
    edit_listed = []
    for letter in word:
        word_listed.append(letter)
    for letter in edit:
        edit_listed.append(letter)
    for letter in edit_listed:
        if letter not in word_listed:
            edit_listed.remove(letter)



print(one_away("world", "word"))
