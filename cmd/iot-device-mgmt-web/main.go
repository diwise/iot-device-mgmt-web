package main

import (
	"context"
	"net/http"

	"github.com/diwise/iot-device-mgmt-web/internal/pkg/presentation"
	"github.com/diwise/service-chassis/pkg/infrastructure/buildinfo"
	"github.com/diwise/service-chassis/pkg/infrastructure/o11y"
	"github.com/riandyrn/otelchi"
	"github.com/rs/cors"
	"github.com/rs/zerolog"

	"github.com/go-chi/chi/v5"
)

const serviceName string = "iot-device-mgmt-web"

func main() {
	serviceVersion := buildinfo.SourceVersion()
	_, logger, cleanup := o11y.Init(context.Background(), serviceName, serviceVersion)
	defer cleanup()

	r := setup(logger)
	handlers.RegisterHandlers(logger, r)

	err := http.ListenAndServe(":8080", r)
	if err != nil {
		logger.Fatal().Err(err).Msg("failed to start router")
	}
}

func setup(log zerolog.Logger) *chi.Mux {
	r := chi.NewRouter()

	r.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		Debug:            false,
	}).Handler)

	r.Use(otelchi.Middleware(serviceName, otelchi.WithChiRoutes(r)))

	return r
}
