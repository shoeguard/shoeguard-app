import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.shoeguard.co/api/v1',
  timeout: 10000,
});

const makeFilename = (length: number) => {
  const result = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength)),
    );
  }
  return `${result.join('')}.mp4`;
};

export const uploadFile = async (uri: string) => {
  try {
    const filename = makeFilename(6);
    const filenameEncoded = encodeURIComponent(filename);
    const response = await axios(
      `https://dailyv-admin.vercel.app/api/file?file=${filenameEncoded}`,
    );

    if (response.status === 200) {
      const {url, fields} = response.data;
      const formData = new FormData();
      Object.entries({...fields}).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });
      formData.append('file', {
        name: filenameEncoded,
        type: 'video/mp4',
        uri,
      });
      console.log(uri);
      console.log(url, fields);
      try {
        const res = await axios.post(url, formData, {
          headers: {
            Accept: 'application/json',
          },
        });

        console.log(res);
      } catch (error) {
        console.log(error);
      }

      return `https://hellocdkstack-myfirstbucketb8884501-1x18qee4k481q.s3.ap-northeast-2.amazonaws.com/${filename}`;
    }
  } catch (error) {
    console.error(error);
  }
};

export default api;
