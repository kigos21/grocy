# Notes on deployment

Don't forget

-   php artisan migrate --force
-   php artisan db:seed
-   composer require league/flysystem-aws-s3-v3 "^3.0" --with-all-dependencies

## What I learned

-   volume mounting (with compose) takes precedence over the files within the image. this means that when you perform COPY . . in your image build, the compose could then overwrite those files after mounting. therefore, volume mounting is excellent in dev phase. this is what I understood...
