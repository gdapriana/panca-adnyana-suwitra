import Validation from "../validation/validation";
import prismaClient from "../application/database";
import slugify from "slugify";
import ResponseError from "../error/response.error";
import EventValidation from "../validation/event.validation";
import { CreateEvent, UpdateEvent } from "../types/event.types";

class EventService {
  static async get(slug: string) {
    const event = await prismaClient.event.findUnique({
      where: {
        slug: slug,
      },
      include: {
        stt: {
          select: {
            logo_url: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!event) throw new ResponseError(404, "item not found");
    return event;
  }
  static async gets() {
    const event = await prismaClient.event.findMany({
      include: {
        stt: {
          select: {
            logo_url: true,
            name: true,
            slug: true,
          },
        },
      },
    });
    return event;
  }
  static async create(body: CreateEvent, stt_slug: string) {
    const validateBody = Validation.validate(EventValidation.CREATE, body);
    const slug = slugify(validateBody.name, { lower: true });
    const event = await prismaClient.event.create({
      data: {
        ...validateBody,
        slug,
        stt_slug,
      },
      select: {
        name: true,
      },
    });
    return event;
  }
  static async update(body: UpdateEvent, slug: string, stt_slug: string) {
    const validateBody = Validation.validate(EventValidation.UPDATE, body);
    const checkEvent = await prismaClient.event.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
        stt_slug: true,
      },
    });
    if (!checkEvent) throw new ResponseError(404, "item not found");
    if (stt_slug !== checkEvent.stt_slug)
      throw new ResponseError(401, "not alowed");
    let newSlug = undefined;
    if (validateBody.name) {
      const tempSlug = slugify(validateBody.name, { lower: true });
      const checkTempSlug = await prismaClient.event.findUnique({
        where: {
          slug: tempSlug,
        },
        select: {
          slug: true,
        },
      });
      if (checkTempSlug) throw new ResponseError(409, "item already exists");
      newSlug = tempSlug;
    }

    const updatedEvent = await prismaClient.event.update({
      where: {
        slug,
      },
      data: {
        ...validateBody,
        slug: newSlug,
      },
      select: {
        name: true,
      },
    });
    return updatedEvent;
  }
  static async delete(slug: string, stt_slug: string) {
    const checkEvent = await prismaClient.event.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
        stt_slug: true,
      },
    });
    if (!checkEvent) throw new ResponseError(404, "item not found");
    if (stt_slug !== checkEvent.stt_slug)
      throw new ResponseError(401, "not alowed");
    const event = await prismaClient.event.delete({
      where: {
        slug,
      },
      select: {
        name: true,
      },
    });
    return event;
  }
}

export default EventService;
