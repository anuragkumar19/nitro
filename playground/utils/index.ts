/**
 * Note: These functions will be implemented in h3
 */

import {
  H3Event,
  InferEventInput,
  ValidateFunction,
  getValidatedQuery,
  readValidatedBody,
  getValidatedRouterParams,
} from "h3";
import { B, q } from "unimport/dist/shared/unimport.d0a971e7.js";

interface Validators<B, Q, P> {
  body?: ValidateFunction<B>;
  query?: ValidateFunction<Q>;
  params?: ValidateFunction<P>;
}

export function defineValidators<B, Q, P, V extends Validators<B, Q, P>>(
  val: V
) {
  return Object.assign(val, {
    __is_validator__: true as const,
  });
}

// We can simplify this in one
type BodyValidator<B> = Pick<
  Required<Validators<B, unknown, unknown>>,
  "body"
> & { __is_validator__: true };

type QueryValidator<Q> = Pick<
  Required<Validators<unknown, Q, unknown>>,
  "query"
> & { __is_validator__: true };

type ParamsValidator<P> = Pick<
  Required<Validators<unknown, unknown, P>>,
  "params"
> & { __is_validator__: true };

// Reimplement readValidatedBody in h3 to accept both a function and a BodyValidator
export function _readValidatedBody<
  T,
  Event extends H3Event = H3Event,
  _T = InferEventInput<"body", Event, T>,
>(event: Event, validator: BodyValidator<_T>): Promise<_T> {
  return readValidatedBody(event, validator.body);
}

export function _getValidatedRouterParams<
  T,
  Event extends H3Event = H3Event,
  _T = InferEventInput<"routerParams", Event, T>,
>(
  event: Event,
  validator: ParamsValidator<_T>,
  opts: { decode?: boolean } = {}
): Promise<_T> {
  return getValidatedRouterParams(event, validator.params);
}

export function _getValidatedQuery<
  T,
  Event extends H3Event = H3Event,
  _T = InferEventInput<"query", Event, T>,
>(event: Event, validator: QueryValidator<_T>): Promise<_T> {
  return getValidatedQuery(event, validator.query);
}

export type ValidatorToX<
  V extends Validators<unknown, unknown, unknown>,
  K extends keyof Required<Validators<unknown, unknown, unknown>>,
> = K extends keyof V
  ? V[K] extends ValidateFunction<unknown>
    ? Awaited<ReturnType<V[K]>>
    : never
  : never;
