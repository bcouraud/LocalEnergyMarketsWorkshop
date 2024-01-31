First, you should ensure you have python installed (3.9 or above, although all versions above have not been tested) with the right libraries ( numpy, pandas, scipy), and ensure that the file "python>optim_standalone.py" can run when, in the terminal (opened from the folder containing the optim_standalone.py file), you run "python optim_standalone.py" , giving this output:
Output Temperature: 
17.32,15.8656,21.936363636363637,20.3,19.2608,18.701504,18.197323519999998,25.169834710743807,23.145454545454548,21.1,20.2,
Required Energy: 
0.0,0.0,60.35529696969697,0.0,0.0,0.0,0.0,64.70158344286509,0.0,0.0,8.399999999999991,


Then, go to pages>api>index.js and look for line 282-283 to change the path that I have put in hard in the code :
the line :     const python = spawn('python.exe',['./python/optim.py',Temperaturemin, weight_env, weight_cost])    
might work by itself if the python version is above 3.9. If you have multiple versions of python installed, make sure the one that is the highest in the enervionment variables "path" is the one above 3.9 (and then close VS Code and launch it again to see the changes by checking "python.exe --version" in the terminal)
 
 Otherwise, you can uncomment the following line, and change the path to the most up-to-date (or v3.9) version of Python. line:    const python = spawn('C:/Users/XXXX/AppData/Local/Programs/Python/Python39/python.exe',['C:/Users/Benoit Couraud/OneDrive - Université Nice Sophia Antipolis/Lectures/localenergymarkets/localenergymarkets/python/optim.py',Temperaturemin, weight_env, weight_cost])




change the path to the location of your python interpreter (python.exe), 

terminal:
npm i
then:
npm audit fix --force
then:
npm run dev

Then, open a browser, and open: http://localhost:19000/
You can navigate through the parts 1, 2 and 3, and follow the pdf attached.

Trouble shooting. If the version of node.js is not correct, here is what you might have to do if you are on windows:
- download and install the latest stable version of node.js: https://nodejs.org/en/download/
- there might be an issue with react's version, in which case you can run:
  1. npm update next
  2. npm update react
  3. then, in the file package.json, you should update the versions     "react": "18.2.0",    and       "react-dom": "18.2.0",   (change 18.2.0 to match the version of your system (after npm update react))
  4. npm i 
- npm run dev



if you have the issue: 
[Error: UNKNOWN: unknown error, readlink 'C:\Users\localenergymarkets\.next\server\middleware-manifest.json'] {
  errno: -4094,
  code: 'UNKNOWN',
  syscall: 'readlink',
  path: 'C:\\localenergymarkets\\localenergymarkets\\.next\\server\\middleware-manifest.json'   
}
delete the .next folder, and run 'npm run dev' again.




