import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Stream } from '@interfaces/streams.interface';
import { StreamService } from '@services/streams.service';

export class StreamController {
  public stream = Container.get(StreamService);

  public getStreams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllStreamsData: Stream[] = await this.stream.findAllStream();

      res.status(200).json({ data: findAllStreamsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStreamsSkip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skip = req.query.skip && /^\d+$/.test(req.query.skip as string) ? Number(req.query.skip) : 0;
      const findAllStreamsData: Stream[] = await this.stream.findAllStreamSkip(skip);

      res.status(200).json({ data: findAllStreamsData, message: 'findAllLimit' });
    } catch (error) {
      next(error);
    }
  };

  public getStreamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const streamId: string = req.params.id;
      const findOneStreamData: Stream = await this.stream.findStreamById(streamId);

      res.status(200).json({ data: findOneStreamData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createStream = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const streamData: Stream = req.body;
      const createStreamData: Stream = await this.stream.createStream(streamData);

      res.status(201).json({ data: createStreamData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStream = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const streamId: string = req.params.id;
      const streamData: Stream = req.body;
      const updateStreamData: Stream = await this.stream.updateStream(streamId, streamData);

      res.status(200).json({ data: updateStreamData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStream = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const streamId: string = req.params.id;
      const deleteStreamData: Stream = await this.stream.deleteStream(streamId);

      res.status(200).json({ data: deleteStreamData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
