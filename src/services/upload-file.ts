import {Storage} from '@google-cloud/storage';
import {get} from 'lodash';

const gcloudPathKey = 'gcloud-key.json';
const BUCKET_NAME = 'mmh_media_upload';

const storage = new Storage({
  projectId: 'mmh-welfare',
  keyFilename: gcloudPathKey,
});

export const uploadAndGetPublicFile = async (
  fileName: string,
  data: string,
  mimeType: string,
) => {
  const file = storage.bucket(BUCKET_NAME).file(fileName);

  const fileOptions = {
    public: true,
    resumable: false,
    metadata: {contentType: mimeType},
    validation: false,
  };
  if (typeof data === 'string') {
    const base64EncodedString = data.replace(/^data:\w+\/\w+;base64,/, '');
    const fileBuffer = Buffer.from(base64EncodedString, 'base64');
    await file.save(fileBuffer, fileOptions);
  } else {
    await file.save(get(data, 'buffer', data), fileOptions);
  }
  const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

  const [metadata] = await file.getMetadata();
  return {
    ...metadata,
    publicUrl,
  };
};
