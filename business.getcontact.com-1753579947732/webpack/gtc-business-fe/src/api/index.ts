import "./shims";

import { useCookies } from "@vueuse/integrations/useCookies";

export { DefaultService as Service } from "@/api/service";

const { get } = useCookies(["token"]);

// makes a curry call with cookie token set
export function callWithToken<
  T extends ({
    xBusinessToken,
  }: { xBusinessToken: string } & Record<any, any>) => ReturnType<T>
>(fn: T, params?: Omit<Parameters<T>[0], "xBusinessToken">): ReturnType<T> {
  const token = get("token");
  return fn({
    xBusinessToken: token,
    ...params,
  }) as ReturnType<T>;
}
