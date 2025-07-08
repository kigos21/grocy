# Notes on deployment

Don't forget

-   php artisan migrate --force
-   php artisan db:seed
-   composer require league/flysystem-aws-s3-v3 "^3.0" --with-all-dependencies

## What I learned

-   volume mounting (with compose) takes precedence over the files within the image. this means that when you perform COPY . . in your image build, the compose could then overwrite those files after mounting. therefore, volume mounting is excellent in dev phase. this is what I understood...

## I had a hard time with

-   Laravel: it's aggresively caching, making it hard to pinpoint the point of errors
-   Managing docker credentials, and pushing to docker hub
-   Updating the images on the VPS
-   Making the domain work, setting up SSL, and making sure everything works for https
-   Dealing with CORS errors. Moreover, HTTPS introduced another quirk of not being able to request to another domain.
-   CSRF cookie handling, can't comprehend it.
