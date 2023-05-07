# myindihome-api-dbt

## Prerequisite

- Node
- MySQL Installed (you can use docker)

## Installation

1. Clone this project

2. Install the npm dependencies

```
npm install
```

3. Create your .env file (you can use from the .env.example)

4. Start your mysql server

4.1 If you want to use docker, please run:

```
npm run compose:refresh
```

5. Generate database

```
npm run db:push
```

6. Run in development mode

```
npm run dev
```
