import { $Fetch as _$Fetch, ExtendedFetchRequest } from "./ofetch"; // Will be imported from ofetch once published

export interface _InternalApi {}

export type InternalApi = Omit<_InternalApi, `/_${string}` | `/api/_${string}`>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type $Fetch<_ = unknown, __ = {}> = _$Fetch<unknown, InternalApi>;

export type NitroFetchRequest = ExtendedFetchRequest<InternalApi>;

declare global {
  // eslint-disable-next-line no-var
  var $fetch: $Fetch;
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      $fetch: $Fetch;
    }
  }
}

export {};
