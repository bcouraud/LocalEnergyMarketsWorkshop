import numpy as np
# import matplotlib.pyplot as plt
import scipy as sc
import datetime as dt
import math
from scipy.io import loadmat
from pandas import read_csv
import pandas as pd 
# import gurobipy as gp
import sys
import scipy as sc
from scipy.optimize import LinearConstraint
from scipy.optimize import milp

# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
# cd Python 
#.venv/Scripts/activate  




LengthOptim = 12

TemperatureMin = 18*np.ones(LengthOptim)

TemperatureMin = np.array([15, 15.2, 21.1,20.3,11.64,14.6,14.5,11.6,21.3,21.1,20.2,5])

weightEnv = 0.5
weightCost = 0.5
# weightEnv = float(sys.argv[2])
# weightCost = float(sys.argv[3])
#Read the line of data from the input
# line = sys.argv[1]
# #Decode the line to UTF-8 and print it
# lineDecoded = line#.decode("UTF-8")
# values = [float(i) for i in lineDecoded.split(',')]    # <<< this should work  # added a list   # comprehension to       # convert values to integers
# TemperatureMin = np.array(values)





CO2emissions =np.array([175.3832496,153.1666087,140.7375224,178.1145482,184.0737135,160.3737913,121.2004819,124.9227102,155.6844156,179.8172943,181.9825352,186.7212864])

GridPrice =np.array([113.4,110.4,106.5,117.4,150.8,161,167.1,148.7,319.4,345.8,156.2,118.4])


EnergyDeficitCost = 10
flexCost = 10
Priority = np.ones((LengthOptim))
alphaThermal2 = 0.01*1440/120
alphaThermal1 =0.01*1440/120
# alphaThermal1 =0.021*1440/120





BPrice= weightEnv*CO2emissions+weightCost*GridPrice
EmaxDaily = 100000
Pmaxchauf = 100

Temperature_Ext = np.array([5, 5.2, 6.1,8.3,11.64,14.6,14.5,11.6,8.3,6.1,5.2,5])

ProductionSeller = EmaxDaily*np.ones(LengthOptim)
DemandRequired = np.zeros(LengthOptim)
TemperatureInit = 19
# TemperatureMin = np.array([TemperatureInit ,20, 20, 0, 20, 23])
TemperatureMax = np.array([28 ,28, 28, 28, 28, 28,28, 28, 28, 28, 28,28])

#int(sum(sum(ProductionSeller,DemandRequired)))
#   f =np.concatenate([BPrice[:,0],-SPrice[:,0],np.zeros(LengthOptim),np.zeros(LengthOptim),np.zeros(LengthOptim),np.zeros(LengthOptim),np.zeros(LengthOptim),np.zeros(LengthOptim),np.zeros(LengthOptim),-confort*np.ones((LengthOptim))]);
# Vector x = [     real demand  ; available production ; demand needs       ; |sum of real demand  - sum of demand needs|;  |Demand needs - real demand| to assess flexibility cost;  Power heater;  Temperature ] We take temperature as a constraint, not something to optimise. Could be changed.  

f =np.r_[BPrice,   np.zeros([LengthOptim]),  np.zeros([LengthOptim]),   EnergyDeficitCost  ,  flexCost*Priority,  BPrice,   np.zeros([LengthOptim])]

#  Index_binary =np.array(list(range(len(f)-2*LengthOptim+1,len(f)+1))); #[121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144];

Aeq1 = np.c_ [ np.zeros((LengthOptim,LengthOptim)), np.eye(LengthOptim), np.zeros((LengthOptim,LengthOptim)), np.zeros([LengthOptim,1]), np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim))]
Aeq2 = np.c_ [ np.zeros((LengthOptim,LengthOptim)), np.zeros((LengthOptim,LengthOptim)), np.eye(LengthOptim), np.zeros((LengthOptim,1)), np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim))]
Aeq3 = np.c_[ np.zeros((LengthOptim,LengthOptim)), np.zeros((LengthOptim,LengthOptim)), np.zeros((LengthOptim,LengthOptim)), np.zeros((LengthOptim,1)), np.zeros((LengthOptim,LengthOptim)),-alphaThermal2*np.eye(LengthOptim),-(1-alphaThermal1)*(np.tri(LengthOptim,LengthOptim,-1)-np.tri(LengthOptim,LengthOptim,-2))+np.eye(LengthOptim)]
                                    # zeros(LengthOptim)                      zeros(LengthOptim)                  zeros(LengthOptim)       zeros(LengthOptim,1)           zeros(LengthOptim)            -alphaThermal2*eye(LengthOptim)  diag(-(1-alphaThermal1)*ones(LengthOptim-1,1),-1)+eye(LengthOptim)

# Aeq3=np.concatenate([np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),gamma*np.eye(LengthOptim),-alpha*np.eye((LengthOptim),k=-1)+np.eye(LengthOptim),],axis=1)
#Aeq4=np.concatenate([np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.zeros((LengthOptim,LengthOptim)),np.eye(LengthOptim)],axis=1)
Aeq =np.concatenate([Aeq1,Aeq2,Aeq3],axis=0)
# print(Aeq)
Beq1=ProductionSeller
Beq2=DemandRequired
Beq3=alphaThermal1*Temperature_Ext+(1-alphaThermal1)*np.r_[np.array([TemperatureInit]), np.zeros(LengthOptim-1)] 
Beq =np.concatenate([Beq1,Beq2,Beq3],axis=0)


A1 = np.c_[np.ones((1,LengthOptim)), np.zeros((1,LengthOptim)), -1*np.ones((1,LengthOptim)), np.array([0]),             np.zeros((1,LengthOptim)),  np.zeros((1,LengthOptim)), np.zeros((1,LengthOptim))]
# A1 = np.concatenate([np.ones((LengthOptim)), np.zeros((LengthOptim)), -1*np.ones((LengthOptim)), 0,             np.zeros((LengthOptim)),  np.zeros((LengthOptim)), np.zeros((LengthOptim)),],axis=1)
                #  ones(1,LengthOptim)    zeros(1,LengthOptim)        -1*ones(1,LengthOptim) 0                    zeros(1,LengthOptim)  zeros(1,LengthOptim)  zeros(1,LengthOptim)  ;  %sum demand <= sum need
A2 = np.c_[np.eye((LengthOptim)), -1*np.eye((LengthOptim)), np.zeros((LengthOptim,LengthOptim)), np.zeros(LengthOptim),             np.zeros((LengthOptim,LengthOptim)),  np.zeros((LengthOptim,LengthOptim)), np.zeros((LengthOptim,LengthOptim))] #demand < production
A3 = np.c_[np.eye((LengthOptim)), np.zeros((LengthOptim,LengthOptim)), -1*np.eye((LengthOptim)), np.zeros(LengthOptim),           -1*np.eye((LengthOptim)),  np.zeros((LengthOptim,LengthOptim)), np.zeros((LengthOptim,LengthOptim))] # |Demand needs - real demand| = X   (x >= (a-b) & x >= b-a)  zeros(LengthOptim)   zeros(LengthOptim)   zeros(LengthOptim)     zeros(LengthOptim,1) zeros(LengthOptim,1) -1*eye(LengthOptim)   %M(b-1) <= |Eb-Eb0| <= bM
A4 = np.c_[-1*np.eye((LengthOptim)), np.zeros((LengthOptim,LengthOptim)), np.eye((LengthOptim)), np.zeros(LengthOptim),           -1*np.eye((LengthOptim)),  np.zeros((LengthOptim,LengthOptim)), np.zeros((LengthOptim,LengthOptim))] # |Demand needs - real demand| = X   To minimise |V-1|, where V is a positive continuous variable, just minimise x subject to x >= V-1 and x >= 1- V.

A5 = np.c_[np.ones((1,LengthOptim)), np.zeros((1,LengthOptim)), -1*np.ones((1,LengthOptim)), np.array([-1]),             np.zeros((1,LengthOptim)),  np.zeros((1,LengthOptim)), np.zeros((1,LengthOptim))]  #x2 =  |Daily ENergy Obtained - Daily ENergy needed |
A6 = np.c_[-1*np.ones((1,LengthOptim)), np.zeros((1,LengthOptim)), np.ones((1,LengthOptim)), np.array([-1]),             np.zeros((1,LengthOptim)),  np.zeros((1,LengthOptim)), np.zeros((1,LengthOptim))]  #x2 =  |Daily ENergy Obtained - Daily ENergy needed |

A =np.concatenate([A1,A2,A3,A4,A5,A6],axis=0)

b = np.r_[np.array([0]),np.zeros((LengthOptim)),np.zeros([LengthOptim]),np.zeros([LengthOptim]),np.array([0]),np.array([0]) ]
lb =np.r_[np.zeros((LengthOptim)),np.zeros((LengthOptim)), np.zeros((LengthOptim)), np.array([0]), np.zeros((LengthOptim)), np.zeros((LengthOptim)), TemperatureMin]
ub =np.r_[EmaxDaily*np.ones((LengthOptim)),EmaxDaily*np.ones((LengthOptim)), EmaxDaily*np.ones((LengthOptim)), np.array([EmaxDaily]), EmaxDaily*np.ones((LengthOptim)), Pmaxchauf*np.ones((LengthOptim)), TemperatureMax]


# model=gp.Model()
# x=model.addMVar(f.shape[0],ub=ub,lb=lb)
# x.obj=f
# model.addConstr(A@x<=b)
# model.addConstr(Aeq@x==Beq)
# model.optimize()
# solution=x.X

############### Scipy ################

A = np.concatenate([A1,A2,A3,A4,A5,A6,Aeq, np.eye(f.shape[0])],axis=0)
bl = np.concatenate([-9e99*np.ones_like(b),Beq, lb],axis =0)
bu = np.concatenate([b,Beq, ub],axis =0)

constraints = LinearConstraint(A, bl, bu)
# integrality = Index_binary

res = milp(c=f, constraints=constraints) #, integrality=integrality)
solution=res.x






# np.set_printoptions(linewidth=300)
output = ""
print("Output Temperature: ")
for i in range(LengthOptim-1):
    output = output+str(solution[solution.shape[0]-LengthOptim+i])+","
print(output)
print("Required Energy: ")
output = ""
for i in range(LengthOptim-1):
    output = output+str(solution[solution.shape[0]-2*LengthOptim+i])+","
print(output)
sys.stdout.flush()
# np.set_printoptions(linewidth=300)
# original_stdout = sys.stdout



# with open('output.txt','w') as file:
#     sys.stdout=file
#     print("f")
#     print(f)
#     print("input:")
#     print(y/1000)
# sys.stdout=original_stdout

# print("Hello ")#+ sys.argv[1] + "or " +  sys.argv[2] +"! temperature = " + Tint)
# sys.stdout.flush()
# plt.figure(1)
# plt.suptitle('Puissances')
# plt.plot(timeenjour,P, timeenjour, D, timeenjour, Powerbat)
# plt.legend(['Production', 'Demand','Battery'])
# plt.xticks(rotation=90)

# plt.figure(2)
# plt.suptitle('Prix')
# plt.plot(timeenjour,BP, timeenjour, SP)
# plt.legend(['Buying Price', 'Selling Price'])
# plt.xticks(rotation=90)
    
# plt.figure(3)
# plt.suptitle('Puissance de chauffage')
# plt.plot(timeenjour,Pchauff)
# plt.legend(['Pchauffage'])
# plt.xticks(rotation=90)

# plt.figure(4)
# plt.suptitle('Tint et Text')
# plt.plot(timeenjour,T,timeenjour,ConsigneH,timeenjour,ConsigneB,timeenjour,Tin)
# plt.legend(['Temp ext','Temp int max','Temp int min',"Temp int réelle"])
# plt.xticks(rotation=90)
