import { SettingsType } from '@/types';
import { SettingsDtoType } from '@/dtos';

export const mapSettings = (item: SettingsDtoType): SettingsType => ({
  taxRateMap: {
    US: parseFloat(item.us_tax_rate),
  },
})
