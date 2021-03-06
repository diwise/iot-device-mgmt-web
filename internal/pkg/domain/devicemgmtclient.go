package domain

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/diwise/service-chassis/pkg/infrastructure/o11y/logging"
	"github.com/diwise/service-chassis/pkg/infrastructure/o11y/tracing"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"go.opentelemetry.io/otel"
)

type DeviceManagementClient interface {
	FindDeviceFromDevEUI(ctx context.Context, devEUI string) (*Device, error)
	GetAll(ctx context.Context) ([]Device, error)
}

type deviceManagementClient struct {
	url string
}

var tracer = otel.Tracer("dmc-client")

func NewDeviceManagementClient(devMgmtUrl string) DeviceManagementClient {
	dmc := &deviceManagementClient{
		url: devMgmtUrl,
	}
	return dmc
}

func (dmc *deviceManagementClient) GetAll(ctx context.Context) ([]Device, error) {
	devices, err := dmc.fetchDevicesFromUrl("/api/v0/devices", ctx)
	if err != nil {
		return nil, err
	}

	return devices, nil
}

func (dmc *deviceManagementClient) FindDeviceFromDevEUI(ctx context.Context, devEUI string) (*Device, error) {
	u := "/api/v0/devices?devEUI=" + devEUI

	devices, err := dmc.fetchDevicesFromUrl(u, ctx)
	if err != nil {
		return nil, err
	}

	if len(devices) == 0 {
		return nil, nil
	}

	return &devices[0], nil
}

func (dmc *deviceManagementClient) fetchDevicesFromUrl(url string, ctx context.Context) ([]Device, error) {
	var err error
	ctx, span := tracer.Start(ctx, "fetch-devices")
	defer func() { tracing.RecordAnyErrorAndEndSpan(err, span) }()

	log := logging.GetFromContext(ctx)

	httpClient := http.Client{
		Transport: otelhttp.NewTransport(http.DefaultTransport),
	}

	request, err := http.NewRequestWithContext(ctx, http.MethodGet, dmc.url+url, nil)
	if err != nil {
		log.Error().Err(err).Msg("failed to create http request")
		return nil, err
	}

	response, err := httpClient.Do(request)
	if err != nil {
		log.Error().Err(err).Msg("failed to retrieve device information from iot-device-mgmt")
		return nil, err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		log.Error().Msgf("request failed with status code %d", response.StatusCode)
		return nil, fmt.Errorf("request failed, no device found")
	}

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Error().Err(err).Msg("failed to read response body")
		return nil, err
	}

	devices := []Device{}

	err = json.Unmarshal(body, &devices)
	if err != nil {
		log.Error().Err(err).Msg("failed to unmarshal response body")
		return nil, err
	}

	return devices, nil
}

type Device struct {
	Identity     string    `json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	Latitude     float64   `json:"latitude"`
	Longitude    float64   `json:"longitude"`
	Environment  string    `json:"environment"`
	Types        []string  `json:"types"`
	SensorType   string    `json:"sensorType"`
	LastObserved time.Time `json:"lastObserved"`
	Active       bool      `json:"active"`
}
