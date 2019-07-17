import torch
from torch import nn

def gaussian_weights_init(m):
    classname = m.__class__.__name__
    if classname.find('Conv') != -1 and classname.find('Conv') == 0:
        m.weight.data.normal_(0.0, 0.02)

class StackHourglass(nn.Module):
    def __init__(self):
        super(StackHourglass, self).__init__()
    
    def conv(inp, kernel_shape, scope_name, stride=[1,1,1,1], dorelu=True):
        if dorelu:
            return nn.Sequential(
                nn.Conv2d(inp, kernel_shape, stride=stride)
            )
        else:
            return nn.Sequential(
                nn.Conv2d(inp, kernel_shape, stride=stride),
                nn.ReLU()
            )
    def pool(inp, name=None, kernel=[2,2], stride=[2,2]):
        kernel = [1] + kernel + [1]
        stride = [1] + stride + [1]
        return nn.MaxPool2d(kernel, stride=stride)
    
    def hourglass():

    def forward():
        pass