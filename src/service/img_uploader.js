class ImgUploader {
  constructor() {
    this.url = 'https://api.cloudinary.com/v1_1/dwu5yaw81/image/upload';
    this.uploadPreset = 'az4nvfwn';
  }

  upload(file) {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('upload_preset', this.uploadPreset);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    return fetch(this.url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}

export default ImgUploader;
