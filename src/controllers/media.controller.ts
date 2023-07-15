// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {repository} from '@loopback/repository';
import {
  getModelSchemaRef,
  HttpErrors, post,
  requestBody,
  response,
  SchemaObject
} from '@loopback/rest';
import {Media} from '../models';
import {MediaRepository} from '../repositories';
import {uploadAndGetPublicFile} from '../services';
import {base64MimeType} from '../utils';

const NewMedia: SchemaObject = {
  type: 'object',
  required: ['image'],
  properties: {
    image: {
      type: 'string',
    },
    extension: {
      type: 'string',
    },
  },
};

export declare type MediaUpload = {
  image: string;
  extension: string;
};

export class MediaController {
  constructor(
    @repository(MediaRepository)
    private mediaRepository: MediaRepository
  ) { }

  @post('/media')
  @response(200, {
    description: 'Upload media to gcs',
    content: {'application/json': {schema: getModelSchemaRef(Media)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: NewMedia,
        },
      },
    })
    mediaUpload: MediaUpload,
  ): Promise<Media> {
    const {image, extension} = mediaUpload;
    const mimeType = base64MimeType(image);
    if (mimeType === undefined) {
      throw new HttpErrors.BadRequest('Invalid image uploaded');
    }
    const media = await uploadAndGetPublicFile(
      `${Date.now()}.${extension}`,
      image,
      mimeType,
    );
    return this.mediaRepository.create({
      file_extension: extension,
      path: media.publicUrl,
    });
  }
}
