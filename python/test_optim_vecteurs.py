import numpy as np
# import matplotlib.pyplot as plt
import scipy as sc
import datetime as dt
import math
from scipy.io import loadmat
from pandas import read_csv
import pandas as pd 
import gurobipy as gp
import sys





f =np.array([-1, -1/3, -1 ,-1.5, 0.3])
A1 =np.c_[np.array([1,1]).reshape(1,2), np.array([1]), np.ones(2).reshape(1,2)]
A2 =np.c_[np.array([0.9]), np.array([0.25]), np.array([5]),np.ones(2).reshape(1,2)]
A = np.concatenate([A1,A2], axis=0)

b = np.r_[np.array([2]), np.array([1])]

lb = np.array([0,0.1,-1,0,0])
ub = np.array([50,50,50,50,50])
model=gp.Model()
x= model.addMVar(5,ub=ub,lb=lb)
x.obj=f
model.addConstr(A@x<=b)
model.optimize()
solution=x.X
print(solution)
print(solution)