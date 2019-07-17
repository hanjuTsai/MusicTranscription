import os
import pickle
import numpy as np
from numpy.random import randint

from config import NetConfig_MIR_1K

## load spectrogram
if not os.path.exists(NetConfig_MIR_1K.PICKLE_PATH):
    raise Exception('Please preprocess training data first')

def load_train_data():
    with open(os.path.join(NetConfig_MIR_1K.PICKLE_PATH,'train.pickle'), 'rb') as f:
        (
            trainMixed,
            trainSrc1,
            trainSrc2,
            trainNum,
            batchSize
        ) = pickle.load(f)
    
    return trainMixed, trainSrc1, trainSrc2, trainNum, batchSize
        
def train(trainMixed, trainSrc1, trainSrc2, trainNum, batchSize):
    displayIter = 100
    lossAcc = 0
    randperm = np.random.permutation(trainNum)
    curIndex = 0
    x_input = np.zeros((batchSize, 512, 64, 1),dtype=np.float32)
    y_input = np.zeros((batchSize, 512, 64, 2),dtype=np.float32)
    for step in range(NetConfig_MIR_1K.FINAL_STEP):
         for i in range(batchSize):
            seq = randperm[curIndex]
            start = randint(0,trainMixed[seq].shape[-1]-64)
            x_input[i,:,:,:] = np.expand_dims(trainMixed[seq][0:512,start:start+64],2)
            y_input[i,:,:,0] = trainSrc1[seq][0:512,start:start+64]
            y_input[i,:,:,1] = trainSrc2[seq][0:512,start:start+64]
            curIndex = curIndex+1
            if curIndex == trainNum:
                curIndex = 0
                randperm = np.random.permutation(trainNum)
            print(x_input)
            print(y_input)
    
if __name__ == '__main__':
    trainMixed, trainSrc1, trainSrc2, trainNum, batchSize = load_train_data()
    train(trainMixed, trainSrc1, trainSrc2, trainNum, batchSize)