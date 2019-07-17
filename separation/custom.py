import torch
from torch import nn
from torch.utils.data import Dataset

class ResidualLoss(nn.Module):
    def __init__(self, weight):
        super(customLoss, self).__init__()

    def forward(self, x_mixed, y_pred):
        y_output = []
        y_output.append(torch.mul(x_mixed,y_pred[0]))
        loss_0 = torch.mean(torch.abs(y_mixed - y_output[0]))
        y_output.append(torch.mul(x_mixed,y_pred[1]))
        loss_1 = torch.mean(torch.abs(y_mixed - y_output[1]))
        y_output.append(torch.mul(x_mixed,y_pred[2]))
        loss_2 = torch.mean(torch.abs(y_mixed - y_output[2]))
        y_output.append(torch.mul(x_mixed,y_pred[3]))
        loss_3 = torch.mean(torch.abs(y_mixed - y_output[3]))
        loss_fn = loss_0+loss_1+loss_2+loss_3
        return loss_fn