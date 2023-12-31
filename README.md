# Desaisiv - Front End Task

## Requirements
You should have Node >v20.3.0 installed.

## Installation
Use the package manager [npm](https://docs.npmjs.com/) to install.

```cmd
npm i
```

## Run

```cmd
npm run dev
```
Navigate to [localhost](http://localhost:3000/)
## Authorization

For authorization use **john@mail.com** for email and **changeme** for password

## Mock Data

+ Authorization api used from [fakeapi](https://fakeapi.platzi.com/en/rest/auth-jwt/)
+ Data table api used from [random-data-api](https://random-data-api.com/documentation)


## Libraries Used

+ [React Router](https://reactrouter.com/en/main) used for routing between pages.
+ [MUI](https://mui.com/) used for the input and table design.
+ [React Hook Form](https://react-hook-form.com/) used to handle form pages.
+ [React Table](https://tanstack.com/table/v8/docs/examples/react/basic) used to manage table.
+ [Axios](https://axios-http.com/docs/intro) used to manage http calls.
+ [NProgress](https://www.npmjs.com/package/nprogress) used for loader.
 
## Project Overview

For dynamic forms you should edit DynamicForms.json available types [password,text,number,date,select]
**Date type** shouldn't have label and **Select type** must provide items

For form page it has simple validations applied to it such as required,invalid

For date table it has load more functionality along with search and pagination