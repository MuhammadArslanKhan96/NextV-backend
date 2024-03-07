import { Router } from 'express';
import { StreamController } from '@controllers/streams.controller';
import { CreateStreamDto } from '@dtos/streams.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class StreamRoute implements Routes {
  public path = '/streams';
  public router = Router();
  public stream = new StreamController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.stream.getStreams);
    this.router.get(`${this.path}/skip`, this.stream.getStreamsSkip);
    this.router.get(`${this.path}/:id`, this.stream.getStreamById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateStreamDto), this.stream.createStream);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateStreamDto, true), this.stream.updateStream);
    this.router.delete(`${this.path}/:id`, this.stream.deleteStream);
  }
}
