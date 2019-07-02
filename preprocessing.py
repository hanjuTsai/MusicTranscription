from os import walk
import os
import numpy as np
from util import get_wav, to_spec
from config import NetConfig_MIR_1K
from random import *
import math
import pickle

#load data
trainMixed = []
trainSrc1 = []
trainSrc2 = []
trainNum = 0
batchSize = 4

if not os.path.exists(NetConfig_MIR_1K.PICKLE_PATH):
    print("create dir {}".format(NetConfig_MIR_1K.PICKLE_PATH))
    os.mkdir(NetConfig_MIR_1K.PICKLE_PATH)

for (root, dirs, files) in walk(NetConfig_MIR_1K.DATA_PATH):
    for f in files:
        filename = '{}/{}'.format(root, f)
        print(filename)
        mixed_wav, src1_wav, src2_wav = get_wav(filename)
        mixed_spec = to_spec(mixed_wav)
        src1_spec = to_spec(src1_wav)
        src2_spec = to_spec(src2_wav)
        mixed_spec_mag = np.abs(mixed_spec)
        src1_spec_mag = np.abs(src1_spec)
        src2_spec_mag = np.abs(src2_spec)

        maxVal= np.max(mixed_spec_mag)
        mixed_spec_mag = mixed_spec_mag / maxVal
        src1_spec_mag = src1_spec_mag / maxVal
        src2_spec_mag = src2_spec_mag / maxVal

        if (mixed_spec_mag.shape[-1]) < 64:
            pad_len = math.ceil((64-mixed_spec_mag.shape[-1])/2)
            print(mixed_spec_mag.shape[-1])
            print(pad_len)
            trainMixed.append(np.pad(mixed_spec_mag,((0, 0), (pad_len, pad_len)),'constant'))
            trainSrc1.append(np.pad(src1_spec_mag,((0, 0), (pad_len, pad_len)),'constant'))
            trainSrc2.append(np.pad(src2_spec_mag,((0, 0), (pad_len, pad_len)),'constant'))
        else:
            trainMixed.append(mixed_spec_mag)
            trainSrc1.append(src1_spec_mag)
            trainSrc2.append(src2_spec_mag)
        trainNum = trainNum+1


print('Number of training examples : {}'.format(trainNum))

trainMixedPath = os.path.join(NetConfig_MIR_1K.PICKLE_PATH,'trainMixed.pickle')
trainSrc1Path = os.path.join(NetConfig_MIR_1K.PICKLE_PATH, 'trainSrc1.pickle')
trainSrc2Path = os.path.join(NetConfig_MIR_1K.PICKLE_PATH, 'trainSrc2.pickle')

with open(trainMixedPath,'wb') as f:
    pickle.dump(trainMixed, f)    
with open(trainSrc1Path,'wb') as f:
    pickle.dump(trainSrc1, f)
with open(trainSrc2Path,'wb') as f:
    pickle.dump(trainSrc2, f)