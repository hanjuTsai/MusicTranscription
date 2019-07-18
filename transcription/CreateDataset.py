import os
import numpy as np
from functools import reduce
from sklearn.model_selection import KFold

## training configuration generation
data_folder = '/home/hanjutsai/MAPS'
all_folder = os.listdir(data_folder)
all_abspath = np.array([])

for folder in all_folder:
    files = os.listdir(os.path.join(data_folder,folder,'MUS'))
    wavfiles = [ file for file in files if '.wav' in file]
    abspath = [ reduce(os.path.join,[data_folder, folder, 'MUS', file]) for file in wavfiles]
    all_abspath = np.append(all_abspath, abspath)

kf = KFold(n_splits=4)
for n_fold, (train_index, test_index) in enumerate(kf.split(all_abspath)):
    train_data = all_abspath[train_index]
    test_data = all_abspath[test_index]

    with open('train_config1_fold_{}.txt'.format(n_fold+1), 'wb') as file:
        file.write(str.encode('\n'.join(train_data)))

    with open('val_config1_fold_{}.txt'.format(n_fold+1), 'wb') as file:
        file.write(str.encode('\n'.join(test_data)))

## testing configuration generation
test_folder = '/home/hanjutsai/MAPS_TEST'
all_folder = os.listdir(test_folder)
all_abspath = np.array([])

for folder in all_folder:
    files = os.listdir(os.path.join(test_folder,folder,'MUS'))
    wavfiles = [ file for file in files if '.wav' in file]
    abspath = [ reduce(os.path.join,[test_folder, folder, 'MUS', file]) for file in wavfiles]
    all_abspath = np.append(all_abspath, abspath)

with open('test_config1.txt'.format(n_fold+1), 'wb') as file:
    file.write(str.encode('\n'.join(all_abspath)))