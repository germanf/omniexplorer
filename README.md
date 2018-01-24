# Omniexplorer
Omniexplorer project.




### Summary
1. Overview
2. Installation
3. Folder structure
4. Project commands
5. How to contribute 




### 1. Overview
---
Omniexplorer

### 2. Installation
---
Dependencies:
```
    $ npm i -g yarn
```

Installation:
```
    $ git clone https://github.com/OmniLayer/omniexplorer.git && cd omniexplorer && rm -rf .git && yarn install && cd ..
```

### 3. Folder structure
---
```
.
├── src/
│   └── assets/
│   └── components/
│   └── config/
│   └── constants/
│   └── layout/
│   └── redux/
│   └── selectors/
│   └── types/
│   └── utils/
│   └── App.jsx
│   └── Bootstrap.jsx
│   └── Root.jsx
│   └── Routes.jsx
├── .babelrc
├── .eslintrc
├── .gitignore
├── .index.html
├── package.json
├── README.md
├── webpack.config.babel.js
```




### 4. Project commands
---

Running application (**Default port: 3000**)
```
    $ yarn start
```
Build for production (it will create a *dist* folder with bundled assets)
```   
    $ yarn run build
```




### 5. How to contribute
---

Contributions are welcome, so if you would like to contribute to the project, please submit a pull request in order to pass through a code review. 
