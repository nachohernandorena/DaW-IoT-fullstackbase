interface httpResponse{
  loadGrid(devList: Array<Device>);
  loadDevice(device: Device, action: string);
  currentUserID(usr_id: string);
 }
