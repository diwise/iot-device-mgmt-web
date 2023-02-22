# iot-device-mgmt-web

# Development
To run the application in development mode, in directory `diwiseweb` run the following command
```
npm run dev
```
That will start a development server and a mock backend api.
# Building and running with Docker

```
docker build -f deployments/Dockerfile -t diwise/iot-device-mgmt-web:latest .
docker run --rm -p 3000:8080 diwise/iot-device-mgmt-web
```

