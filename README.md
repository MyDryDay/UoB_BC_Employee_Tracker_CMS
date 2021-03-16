# Employee Tracker Content Management System

  # Description
  A small application used to keep track of the departments, roles & employees within a business

  ## Contents
  Section                       | Description
  ----------------------------- | --------------------------------------------------
  [Installation](#Installation) | How To Install & Dependancies
  [Usage](#Usage)               | How To Use The Application
  [Contributing](#Contributing) | Information For Those That Wish To Contribute
  [Testing](#Testing)           | Information Regarding Tests I've Carried Out
  [Questions](#Questions)       | Contact Information For Those That Have Questions

  ## Installation
  1. Download / clone this repository. 
  2. Navigate to the downloaded / cloned repository with a CLI. 
  3. In the root of the repository type the following command into your CLI: 'npm install'. 

  ### Usage
  Once downloaded / cloned & dependencies have been installed, follow these steps: 
  1. Create a server using mySQL 
  2. Open the repository and navigate to the index.js file. Here, alter the 'connectionConfig' variable on line 17 to include your credentials for your own mySQL server. 
  3. Using mySQL Workbench open the 'schema.sql' file located in the 'db' directory and run those commands to create the database & tables. 
  4. Again using mySQL Workbench, open the 'seed.sql' file in the same directory. Run these commands to seed the database tables with some data (Alternatively you can add your        own data by altering the commands within 'seed.sql' to match your needs). 
  5. Return to the root of the directory using a CLI and type 'node index.js' - this will start the application. 
  6. From here you can: View all departments, roles or employees; Add departments, roles or employees; Update an employee's role; and Delete departments, roles and employees

  ### License ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)(https://opensource.org/licenses/MIT) 
 
  Project created using the MIT license.
  [Learn more...](https://opensource.org/licenses/MIT)

  #### Contributing
  Please contribute if you would like to do so.

  #### Testing
  Any testing was carried out by using the application itself.

  #### Questions
  GitHub: https://github.com/MyDryDay,  
  LinkedIn: https://www.linkedin.com/in/george-cope-633b761bb/,  
  Telegram: https://t.me/G_Cope97
