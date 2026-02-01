export type ApiCallState<TSuccess = unknown> =
  | { state: 'loading' }
  | { state: 'success'; data?: TSuccess }
  | { state: 'error'; error: string };
