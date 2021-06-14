class ImgUploader {
  constructor() {
    this.url = 'https://api.cloudinary.com/v1_1/dwu5yaw81/image/upload';
    this.uploadPreset = 'az4nvfwn';
  }

  async upload(file) {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('upload_preset', this.uploadPreset);

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    const result = await fetch(this.url, requestOptions);
    return await result.json();
  }
}

export default ImgUploader;
