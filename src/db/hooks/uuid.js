import { v4 as uuidv4 } from 'uuid';

export function setUuid(model, options) {
    model.uuid = uuidv4();
}
