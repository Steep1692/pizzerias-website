import {makeRequest} from "./api.service";
import { mapSettings } from '@/mappers';

export const getSettingsRequest = () => {
  return makeRequest('/settings').then(mapSettings)
}
