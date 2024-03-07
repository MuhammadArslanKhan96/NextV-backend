import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Stream } from '@interfaces/streams.interface';
import { StreamModel } from '@models/streams.model';

@Service()
export class StreamService {
  public async findAllStream(): Promise<Stream[]> {
    const streams: Stream[] = await StreamModel.find();
    return streams;
  }

  public async findAllStreamSkip(skip: number): Promise<Stream[]> {
    const streams: Stream[] = await StreamModel.find({}, undefined, { skip, limit: 100 }).sort('name');
    return streams;
  }

  public async findStreamById(streamId: string): Promise<Stream> {
    const findStream: Stream = await StreamModel.findOne({ _id: streamId });
    if (!findStream) throw new HttpException(409, "Stream doesn't exist");

    return findStream;
  }

  public async createStream(streamData: Stream): Promise<Stream> {
    const findStream: Stream = await StreamModel.findOne({ url: streamData.url });
    if (findStream) throw new HttpException(409, `This url ${streamData.url} already exists`);

    const createStreamData: Stream = await StreamModel.create(streamData);

    return createStreamData;
  }

  public async updateStream(streamId: string, streamData: Stream): Promise<Stream> {
    if (streamData.url) {
      const findStream: Stream = await StreamModel.findOne({ url: streamData.url });
      if (findStream && findStream._id != streamId) throw new HttpException(409, `This url ${streamData.url} already exists`);
    }

    const updateStreamById: Stream = await StreamModel.findByIdAndUpdate(streamId, { streamData });
    if (!updateStreamById) throw new HttpException(409, "Stream doesn't exist");

    return updateStreamById;
  }

  public async deleteStream(streamId: string): Promise<Stream> {
    const deleteStreamById: Stream = await StreamModel.findByIdAndDelete(streamId);
    if (!deleteStreamById) throw new HttpException(409, "Stream doesn't exist");

    return deleteStreamById;
  }
}
