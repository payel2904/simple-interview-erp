
## Steps to Install

Install composer:

    composer install

Install Npm and Create Build file:

    npm install && npm run build
    
Create .env file:

    cp .env.example .env
    
Generate Application key:

    php artisan key:generate

Create databse connection and migrate tables:

    php artisan migrate

Run For Sample Data

    php artisan db:seed

Run the application:

    php artisan serve

