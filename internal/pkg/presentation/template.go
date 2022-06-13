package handlers

const templ string = `
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <title>Diwise Admin GUI 0.0.1</title>
  <!-- Bootstrap core CSS -->
  <link href="./assets/dist/css/bootstrap.min.css" rel="stylesheet">

  <style>
    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }
  </style>

  <!-- Custom styles for this template -->
  <link href="./assets/css/dashboard.css" rel="stylesheet">
</head>

<body>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"><img src="./assets/brand/diwise-white-alpha+tight.png" style="height:30px"></a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3" href="#">Sign out</a>
      </div>
    </div>
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                <span data-feather="home"></span>
                Devices
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file"></span>
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <h2>{{ .Title }}</h2>
        <div class="accordion" id="accordionExample">
          {{ range $index, $element := .Items }}
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-heading-{{ $index }}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse-{{ $index }}" aria-expanded="false" aria-controls="panelsStayOpen-collapse-{{ $index }}">
                <div class="row align-items-center">
                  <div class="col">
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled" {{ if .Active }} checked {{ end }} disabled>
                      <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Aktiv</label>
                    </div>
                  </div>
                  <div class="col">
                    {{ .Name }}
                  </div>
                  <div class="col">
                    {{ if .LastObserved.IsZero }}
                      &nbsp;
                    {{ else }}
                      {{ .LastObserved.Format "2006-01-02 15:04:05" }}
                    {{ end }}
                  </div>
                </div>
              </button>
            </h2>
            <div id="panelsStayOpen-collapse-{{ $index }}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading-{{ $index }}">
              <div class="accordion-body">
                <table class="table table-striped table-sm">
                  <tbody>
                    <tr><td>ID</td><td>{{ .Identity }}</td></tr>
                    <tr><td>Namn</td><td>{{ .Name }}</td></tr>
                    <tr><td>Beskrivning</td><td>{{ .Description }}</td></tr>
                    <tr><td>Latitud</td><td>{{ .Latitude }}</td></tr>
                    <tr><td>Longitud</td><td>{{ .Longitude }}</td></tr>
                    <tr><td>Miljö</td><td>{{ .Environment }}</td></tr>
                    <tr><td>Typ</td><td>
                      {{ range .Types }}
                        {{ . }}<br/>
                      {{ end }}</td></tr>
                    <tr><td>Sensortyp</td><td>{{ .SensorType }}</td></tr>
                    <tr><td>Senast observerad</td><td>{{ .LastObserved.Format "2006-01-02 15:04:05" }}</td></tr>
                    <tr><td>Aktiv</td><td>{{ .Active }}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {{ end }}
        </div>
      </main>
    </div>
  </div>

  <script src="./assets/dist/js/bootstrap.bundle.min.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
    integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"
    integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha"
    crossorigin="anonymous"></script>
  <script src="./assets/js/dashboard.js"></script>
</body>

</html>
`
