package handlers

import (
	"net/http"
	"strings"
	"text/template"

	"github.com/diwise/iot-device-mgmt-web/internal/pkg/domain"
	"github.com/diwise/service-chassis/pkg/infrastructure/env"
	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog"
)

func RegisterHandlers(log zerolog.Logger, router *chi.Mux) *chi.Mux {
	deviceManagementUrl := env.GetVariableOrDie(log, "DEVICE_MGMT_URL", "iot-device-mgmt url")
	wwwroot := env.GetVariableOrDie(log, "GUI_WEB_ROOT", "webroot")

	deviceManagementClient := domain.NewDeviceManagementClient(deviceManagementUrl)

	filesDir := http.Dir(wwwroot)
	FileServer(router, "/assets", filesDir)

	router.Get("/", NewGuiHandler(log, deviceManagementClient))

	return router
}

func NewGuiHandler(log zerolog.Logger, d domain.DeviceManagementClient) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		t, err := template.New("index.html").Parse(templ)
		if err != nil {
			log.Error().Err(err).Msg("unable to parse template")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		devices, err := d.GetAll(r.Context())
		if err != nil {
			log.Error().Err(err).Msg("unable to list all devices")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		data := struct {
			Title string
			Items []domain.Device
		}{
			Title: "Devices",
			Items: devices,
		}

		if err = t.Execute(w, data); err != nil {
			log.Error().Err(err).Msg("unable to execute template")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

func FileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit any URL parameters.")
	}

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", http.StatusMovedPermanently).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(root))
		fs.ServeHTTP(w, r)
	})
}
