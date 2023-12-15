import {makeRequest} from "./api";
import { mapSettings } from '@/mappers';

export const getSettingsRequest = () => {
  return makeRequest('/settings').then(mapSettings)
}
