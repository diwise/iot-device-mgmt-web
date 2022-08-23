import HttpService from "./HttpService";

function getDeviceData(){
    const url = `/api/v0/devices`
    //const [devices, setDevices] = React.useState(null)

    HttpService.getAxiosClient().get(url)
        .then(response => {
            //setDevices(response.data)
            console.log(response.data)
        })

}

const DeviceService = {
    getDeviceData
}
  
export default DeviceService;